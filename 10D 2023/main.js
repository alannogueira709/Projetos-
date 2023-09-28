let sensor = new Gyroscope({frequency:60});

sensor.addEventListener("activate", ()=>console.log("giroscópio pronto."));
sensor.onreading = ()=>{"giroscopio: lendo"};
sensor.start();


EventTarget.addEventListener(   =>(){
    Sensor.start() 

}); 