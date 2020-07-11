function check (v: string, n: number) {
    for (let i = 0; i <= values.length - 1; i++) {
        const item = values.get(i)
        if (values.get(i).get(0) == v) {
                    // +string >> value; i.e.:parseFloat
                    if (n > +item.get(1) && n < +item.get(2)) {
                        r = true
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
})
let r = false
let log_to_data_streamer = false
let values: string[][] = []
values.push(["t0", "0", "1000000"])
values.push(["t1", "0", "1000000"])
values.push(["acc_x", "-1024", "1024"])
values.push(["acc_y", "-1024", "1024"])
values.push(["acc_z", "-1024", "1024"])
values.push(["radius", "-3.1415", "3.1415"])
values.push(["rotations", "-1000", "1000"])
values.push(["distance", "0", "100000"])
values.push(["rpm", "0", "100000"])
values.push(["rpm_min", "0", "1000"])
values.push(["rpm_max", "0", "1000"])
values.push(["rpm_avr", "0", "1000"])
values.push(["kph", "0", "100"])
values.push(["kph_min", "0", "1000"])
values.push(["kph_max", "0", "1000"])
values.push(["kph_avr", "0", "1000"])
values.push(["eol", "0", "2"])

basic.showString("M")
radio.setGroup(101)
radio.setTransmitPower(7)
log_to_data_streamer = false