
//在網址上直接用語法輸入
(function() {
  let el = document.querySelectorAll("input");
  el[0].value = "dragonqoo1988@gmail.com";
  el[1].value = "林暐哲";
  el[2].value = "Luke";
  el[3].value = "a123";
  el[4].value = "a123";

  
})();


//在網址上直接用語法輸入，可觸發change
(function(){
    function setNativeValue(element, value) {
        let lastValue = element.value;
        element.value = value;
        let event = new Event("input", { target: element, bubbles: true });
        event.simulated = true;
        let tracker = element._valueTracker;
        if (tracker) {
            tracker.setValue(lastValue);
        }
        element.dispatchEvent(event);
    }
    
    var input = document.querySelectorAll("input");
    setNativeValue(input[3], "1988-08-12");
    setNativeValue(input[4], "0921123456");
    setNativeValue(input[5], "新北市三重區");
})()
