package server

import (
	"bufio"
	"fmt"
	"net"
	"strings"

	"github.com/tarm/serial"
)

const (
	ConnTypeUSB     = "usb"
	ConnTypeNetwork = "network"
)

type ScannerConn struct {
	udpAddress *net.UDPAddr
	udpConn    *net.UDPConn
	usbConfig  *serial.Config
	usbConn    *serial.Port
	usbReader  *bufio.Scanner
	Type       string
	usbPort    string
}

func NewUDPConn(addr *net.UDPAddr) (*ScannerConn, error) {
	return &ScannerConn{
		Type:       ConnTypeNetwork,
		udpAddress: addr,
	}, nil
}

func NewUSBConn(path string) (*ScannerConn, error) {
	return &ScannerConn{
		Type:      ConnTypeUSB,
		usbPort:   path,
		usbConfig: &serial.Config{Name: path, Baud: 115200},
	}, nil
}

func (c *ScannerConn) Open() error {
	var connErr error
	switch c.Type {
	case ConnTypeNetwork:
		c.udpConn, connErr = net.DialUDP("udp", nil, c.udpAddress)
	case ConnTypeUSB:
		c.usbConn, connErr = serial.OpenPort(c.usbConfig)
		c.usbReader = bufio.NewScanner(c.usbConn)
		c.usbReader.Split(ScanLinesWithCR)
	}
	return connErr
}

func (c ScannerConn) Close() error {
	switch c.Type {
	case ConnTypeNetwork:
		return c.udpConn.Close()
	case ConnTypeUSB:
		return c.usbConn.Close()
	}
	return nil
}

func (c ScannerConn) Write(b []byte) (n int, err error) {
	switch c.Type {
	case ConnTypeNetwork:
		return c.udpConn.Write(b)
	case ConnTypeUSB:
		fixed := []byte(strings.ReplaceAll(string(b), "\n", "\r"))
		return c.usbConn.Write(fixed)
	}
	return 0, nil
}

func (c ScannerConn) Read(b []byte) (n int, err error) {
	switch c.Type {
	case ConnTypeNetwork:
		return c.udpConn.Read(b)
	case ConnTypeUSB:
		if !c.usbReader.Scan() {
			return 0, nil
		}
		scanned := c.usbReader.Bytes()
		copy(b, scanned)
		return len(scanned), nil
	}
	return 0, nil
}

func (c ScannerConn) String() string {
	switch c.Type {
	case ConnTypeNetwork:
		return fmt.Sprintf("Connected to %s via UDP", c.udpAddress)
	case ConnTypeUSB:
		return fmt.Sprintf("Connected to %s via USB", c.usbPort)
	}
	return "unknown"
}
