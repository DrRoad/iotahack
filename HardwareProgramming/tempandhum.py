import urllib2
import serial
import time
ser = serial.Serial('COM4', 9600, timeout = 0)
TempStr =""
while 1:
    try:
        TempStr = ser.readline()
        print(TempStr)
        time.sleep(15)
    except ser.SerialTimeoutException:
        print('Data could not be read')
        time.sleep(1)
    response = urllib2.urlopen('http://iotahack.eu-gb.mybluemix.net/sensorpush?DevID=2003,&Temperature=24.00,&Humidity=57.00')
    print 'RESPONSE:', response
    print 'URL     :', response.geturl()
    headers = response.info()
    print 'DATE    :', headers['date']
    print 'HEADERS :'
    print '---------'
    print headers
    data = response.read()
    print 'LENGTH  : ',len(data)
    print 'DATA    :'
    print '---------'
    print data

