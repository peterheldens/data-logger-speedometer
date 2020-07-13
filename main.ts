function check (v: string, n: number) : boolean {
    let r=false
    for (let i = 0; i <= values.length - 1; i++) {
        const item = values.get(i)
        if (item.get(0) == v) {
                    // +string >> value; i.e.:parseFloat
                    if (n >= +item.get(1) && n <= +item.get(2)) {
                        r = true
                        break
                    }
                }
    }
    return r
}
// Press A to stream to makecode
input.onButtonPressed(Button.A, function () {
    log_to_data_streamer = false
    basic.pause(100)
    basic.clearScreen()
    basic.showString("M")
})
// Press B to stream to excel datastreamer
input.onButtonPressed(Button.B, function () {
    log_to_data_streamer = true
    basic.pause(100)
    basic.clearScreen()
    basic.showString("E")
})
radio.onReceivedValue(function (name, value) {
    if (check(name, value)==true) {
        if (log_to_data_streamer) {
            if (name == "eol") {
                serial.writeNumber(radio.receivedPacket(RadioPacketProperty.SignalStrength))
                serial.writeLine("")
            } else {
                serial.writeNumber(value)
                serial.writeString(",")
            }
            led.toggle(4, 2)
        } else {
            if (name == "eol") {
                serial.writeValue(name, radio.receivedPacket(RadioPacketProperty.SignalStrength))
            } else {
                serial.writeValue(name, value)
            }
            led.toggle(2, 4)
        }
    } else {
        error+=1
        serial.writeValue("error"+"="+name,value)
    }   
})
let error=0
let log_to_data_streamer = false
let values: string[][] = []
values.push(["t0", "0", "1000000"])
values.push(["t1", "0", "1000000"])
values.push(["acc_x", "-1024", "1024"])
values.push(["acc_y", "-1024", "1024"])
values.push(["acc_z", "-1024", "1024"])
values.push(["radius", "-3.1415", "3.1415"])
values.push(["rotation", "-1000", "1000"])
values.push(["distance", "-10000", "100000"])
values.push(["rpm", "-1500", "1500"])
values.push(["rpm_min", "-1500", "1500"])
values.push(["rpm_max", "-1500", "1500"])
values.push(["rpm_avr", "-1500", "1500"])
values.push(["kph", "-200", "200"])
values.push(["kph_min", "-200", "200"])
values.push(["kph_max", "-200", "200"])
values.push(["kph_avr", "-200", "200"])
values.push(["eol", "0", "2"])

basic.showString("M")
radio.setGroup(101)
radio.setTransmitPower(7)
log_to_data_streamer = false