function logging(func) {

    function fcc() {
        console.log('开始时间:' + new Date())
        fc = func()
        console.log('结束时间:' + new Date())
        return fc
    }
    return fcc

}

// @logging
function count() {
    let total = 0
    for (let index = 0; index < 3000000000; index++) {
        total += index;       
    }
    console.log(total)
}

var count = logging(count)

count()