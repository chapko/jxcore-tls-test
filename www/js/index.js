var ip = document.querySelector('#ip');
var data = document.querySelector('#data');
var run = document.querySelector('#run');

document.addEventListener('deviceready', function () {
    jxcore.isReady(function () {
        jxcore('index.js').loadMainFile(function (ret, err) {
            if (err) {
                alert(err.message || String(err));
                return;
            }

            var parentElement = document.getElementById('deviceready');
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            parentElement.className = '';
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');

            ready();
        });
    });
}, false);

run.addEventListener('click', function (event) {
    event.preventDefault();
    jxcore('run').call(ip.value, data.value);
}, false);

function ready() {
    ip.disabled = false;
    data.disabled = false;
    run.disabled = false;
}
