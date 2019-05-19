
import * as Chartist from './chartist.min.js';

const wrapperItems = document.querySelector('.wrapper-content');
const btnAddCard = document.querySelector('.add-new-obj');
let flagDD = true;
let globalCameraId;
let globalObjId;
let arrayPlotX;
let arrayPlotY;

let arrayCircleX;
let arrayCirleY;

window.addEventListener('load', onload);



function openDrop() {
    dropDown.style.display = 'flex';

}

function onload() {
    getAllObj();
    btnAddCard.addEventListener('click', addNewCard);
    //deleteObj()

}

function clearActive(){
    document.querySelector('.active').classList.remove('active');
}


function getAllObj() {
    let haveObject = fetch("http://10.8.0.10/api/getObjects", {
        method: 'POST',
        body: JSON.stringify({
            "offset": 0,
            "limit": 100
        })
    })
    haveObject.then((res) => {
        return res.json();
    })
        .then((result) => {
            getAllCallBack(result);
        })
}

let svgIcons = [
    `<svg width="160" height="98" viewBox="0 0 160 98" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M53.5 23C53.5 19.4101 56.4101 16.5 60 16.5H150C153.59 16.5 156.5 19.4101 156.5 23V94.5H53.5V23Z" stroke="#4E4E4E" stroke-width="7"/>
    <rect y="36" width="50" height="7" fill="#4E4E4E"/>
    <path d="M14.5 58C14.5 54.4101 17.4101 51.5 21 51.5H53.5V94.5H14.5V58Z" stroke="#4E4E4E" stroke-width="7"/>
    <rect x="57" y="11" width="96" height="24" fill="#FBFBFB"/>
    <path d="M74.1855 20.6685C73.5833 21.5311 72.741 22.1781 71.6587 22.6094C70.5845 23.0326 69.3312 23.2441 67.8989 23.2441C66.4504 23.2441 65.1646 22.9064 64.0415 22.231C62.9185 21.5474 62.0477 20.5789 61.4292 19.3257C60.8188 18.0724 60.5055 16.6198 60.4893 14.9678V13.4175C60.4893 10.7401 61.1118 8.66488 62.3569 7.19189C63.6102 5.71891 65.368 4.98242 67.6304 4.98242C69.4858 4.98242 70.9792 5.4585 72.1104 6.41064C73.2415 7.35465 73.9333 8.69743 74.1855 10.439H71.8418C71.4023 8.08708 70.0026 6.91113 67.6426 6.91113C66.0719 6.91113 64.8797 7.46452 64.0659 8.57129C63.2603 9.66992 62.8534 11.265 62.8452 13.3564V14.8091C62.8452 16.8029 63.3009 18.3898 64.2124 19.5698C65.1239 20.7417 66.3568 21.3276 67.9111 21.3276C68.79 21.3276 69.5591 21.23 70.2183 21.0347C70.8774 20.8394 71.4227 20.5098 71.854 20.0459V16.0542H67.7402V14.1499H74.1855V20.6685ZM87.9185 18.3613H80.4722L78.7998 23H76.3828L83.1699 5.22656H85.2207L92.02 23H89.6152L87.9185 18.3613ZM81.1802 16.4326H87.2227L84.1953 8.11963L81.1802 16.4326ZM96.7686 21.0835H105.191V23H94.4126V5.22656H96.7686V21.0835ZM117.923 18.3613H110.477L108.805 23H106.388L113.175 5.22656H115.226L122.025 23H119.62L117.923 18.3613ZM111.185 16.4326H117.228L114.2 8.11963L111.185 16.4326ZM130.216 12.0381L134.476 5.22656H137.235L131.62 14.04L137.369 23H134.586L130.216 16.0664L125.821 23H123.05L128.812 14.04L123.185 5.22656H125.931L130.216 12.0381ZM145.511 14.1499L150.15 5.22656H152.811L146.683 16.3716V23H144.339V16.3716L138.211 5.22656H140.897L145.511 14.1499Z" fill="#9933FF"/>
    </svg>
    `
    ,
    `
    <svg width="141" height="136" viewBox="0 0 141 136" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21 55V96C21 104.284 27.7157 111 36 111H104C112.284 111 119 104.284 119 96V55H112V96C112 100.418 108.418 104 104 104H36C31.5817 104 28 100.418 28 96V55H21Z" fill="#4E4E4E"/>
            <path d="M3 76L70.5 6L138 76" stroke="#4E4E4E" stroke-width="7"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M69 87H71C75.4183 87 79 90.5817 79 95V109.778C79 110.193 78.9683 110.602 78.9072 111H85.9509C85.9834 110.597 86 110.189 86 109.778V95C86 86.7157 79.2843 80 71 80H69C60.7157 80 54 86.7157 54 95V109.778C54 110.189 54.0166 110.597 54.0491 111H61.0928C61.0317 110.602 61 110.193 61 109.778V95C61 90.5817 64.5817 87 69 87Z" fill="#9933FF"/>
            <rect x="61" y="104" width="18" height="9" fill="#FBFBFB"/>
            </svg>
    `,
    `<svg width="130" height="102" viewBox="0 0 130 102" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="13.5" y="17.5" width="103" height="78" stroke="#4E4E4E" stroke-width="7"/>
    <rect width="130" height="7" fill="#9933FF"/>
    <path d="M45.5 72C45.5 61.2304 54.2304 52.5 65 52.5C75.7696 52.5 84.5 61.2304 84.5 72V95.5H45.5V72Z" stroke="#4E4E4E" stroke-width="7"/>
    <rect x="49" y="88" width="32" height="14" fill="#FBFBFB"/>
    </svg>
    `,

]
function viewAllObjects(array) {
    btnAddCard.removeEventListener('click', addNewCard);
    //create wrapper for card
    wrapperItems.innerHTML = "";
    let wrapper = document.createElement('div')
    wrapper.classList = "row-tabs";
    wrapperItems.appendChild(wrapper);
    // add card on html
    for (let index = 0; index < array.length; index++) {
        let id = array[index].id;
        let title = array[index].name;
        let descr = array[index].description;
        let newItem = document.createElement('div');
        newItem.classList = 'card';
        newItem.setAttribute('data-id', id);
        newItem.addEventListener('click', onItemClick);
        newItem.innerHTML =
            `
            <div class="title">${title}</div>
            <div class="icon">
            ${svgIcons[index]}
            </div>
            <div class="description">${descr}</div>
            `;
        wrapper.appendChild(newItem);
    }
}


function getAllCallBack(result) {
    if (result.objects.length > 0) {
        viewAllObjects(result.objects);
        viewAddObjects()
    } else {
        return;
    }
}
function getAllCallBackCameras(result, id) {
    globalCameraId = id;
    if (result.cameras.length > 0) {
        viewAllCameras(result.cameras);
    } else {
        addFirstCamera();
    }
}
function addFirstCamera() {
    wrapperItems.innerHTML = "";
    let addCameras = document.createElement('div')
    addCameras.classList = "add-camers";
    addCameras.innerHTML =
        `
    <h2>
    Добавить камеру
    </h2>
    <div class="add-circle-cameras">+</div>
    `
    wrapperItems.appendChild(addCameras);

    document.querySelector('.add-circle-cameras').addEventListener('click', addCamerasRequest)
}

function makeActive(num){
    document.querySelectorAll('.menu li')[num].firstChild.className = "active"
}

function onItemClick(e) {
    wrapperItems.innerHTML = "Загрухка..."
    clearActive();
    makeActive(1);
    if (e.target.className == "card") {
        getallCameras(e.target.getAttribute('data-id'));
    }
    if (e.target.classList == "card card-add") {
        wrapperItems.innerHTML = `<h1>Добавьте объект</h1>
            <form id="add-obj-form" action="">
                <input class="obj-name" type="text" name="name" placeholder="Название" />
                <textarea class="obj-descr" name="descr" id="" cols="30" rows="10" placeholder="Описание"></textarea>
                <button class="add-new-obj">Добавить</button>
            </form>`;
        addeventadd();
    }

}
function getallCameras(id) {
    globalObjId = id;
    let haveObject = fetch("http://10.8.0.10/api/getCameras", {
        method: 'POST',
        body: JSON.stringify({
            objectID: `${id}`
        })
    })
    haveObject.then((res) => {
        return res.json();
    })
        .then((result) => {
            getAllCallBackCameras(result, id);
        })
}

function addeventadd() {
    document.querySelector('.add-new-obj').addEventListener('click', addNewCard)
}

function viewAddObjects() {
    let addCardItem = document.createElement('div');
    addCardItem.classList = 'card card-add';
    addCardItem.setAttribute("data-add", true)
    addCardItem.addEventListener('click', onItemClick)
    addCardItem.innerHTML =
        `
    <div class="add-circle">+ </div>
    `;
    document.querySelector('.row-tabs').appendChild(addCardItem);
}

function addNewCard(event) {
    event.preventDefault();
    let name = document.querySelector('.obj-name').value;
    let descr = document.querySelector('.obj-descr').value;
    let addCard = fetch("http://10.8.0.10/api/addObject", {
        method: 'POST',
        body: JSON.stringify({
            objectName: `${name}`,
            objectDescription: `${descr}`
        })
    })
    addCard.then((res) => {
        return res.json();
    })
        .then((result) => {
            getAllObj();
        })
}


function deleteObj() {
    fetch("http://10.8.0.10/api/deleteObject", {
        method: 'POST',
        body: JSON.stringify({
            objectId: 8
        })
    }).then((result) => {
        return result.json();
    }).then((result) => {
        console.log(result);
    })
}

function onItemClickCameras(e) {
    console.log(e.target)
    if (e.target.className == "camera") {
        globalCameraId = e.target.getAttribute("data-id");
        
        wrapperItems.innerHTML = "Загрузка...."
        getPlotChoords()
    }
}


function getPlotChoords(start = 0, stop = 1000000000000000000) {
    
    fetch("http://10.8.0.10/api/getDensity", {
        method: 'POST',
        body: JSON.stringify({
            startTime: `${start}`,
            endTime: `${stop}`,
            cameraId: globalCameraId
        })
    }).then((result) => {
        return result.json();
    }).then((result) => {

        callbaclonPlot(result.dots);
    })
}
function callbaclonPlot(obj) {
    arrayPlotX = obj.x;
    arrayPlotY = obj.y;
    getCircleChoords()

}
function getCircleChoords() {
    fetch("http://10.8.0.10/api/getDirectionsDensity", {
        method: 'POST',
        body: JSON.stringify({
            startTime: 0,
            endTime: 10000000000000000000000,
            cameraId: globalCameraId
        })
    }).then((result) => {
        return result.json();
    }).then((result) => {

        console.log(result)
        callbaclonCircle(result.percents);
    })
}
function callbaclonCircle(array) {
    arrayCircleX = array;
    getAnalitic();
}
function getAnalitic() {

    document.body.style.overflow = 'scroll'
    wrapperItems.innerHTML =
        `
        <div class="wrapper-title">
            <span>От</span> 
            <input type="date" class="on-date-anal"> 
            <div class="line-anal"></div>
            <span>До</span>  
            <input type="date" class="to-date-anal"> 
            <button class="create-anal">Показать статистику</button>
        </div>
    <div class="wrapper-plot">
    <div class="plot-name">
        <h1>Распределение плотности по камере</h1>
        <div class="ct-chart ct-perfect-fourth"></div>
        <h3>Данный график показывает зависимость среднего кол-ва людей от даты</h3>
    </div>
    <div class="plot-name">
        <h1>Плотность по облости (<span class="left-side">Левая</span>/<span class="right-side">правая</span> часть)</h1>
        <div class="ct-chart-2 ct-perfect-fourth"></div>
        <h3>Процентное соотношение движения людей от выбранного направления</h3>
    </div>
    <div class="wrapper-img">
        <h4 class="load-imgtext">Загрузка тепловой карты</h4>
    </div>
    </div>
    
    `;
    var chart = new Chartist.Line('.ct-chart', {
        labels: arrayPlotX,
        series: [
            arrayPlotY
        ]
    }, {
            low: 0,
            showArea: true,
            showPoint: false,
            fullWidth: true
        });

    chart.on('draw', function (data) {
        if (data.type === 'line' || data.type === 'area') {
            data.element.animate({
                d: {
                    begin: 2000 * data.index,
                    dur: 2000,
                    from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                    to: data.path.clone().stringify(),
                    easing: Chartist.Svg.Easing.easeOutQuint
                }
            });
        }
    });
    console.log(arrayCircleX)
    let leftPercent = arrayCircleX[0];
    let rightPercent = arrayCircleX[1];
    leftPercent = Math.floor(leftPercent);
    rightPercent = Math.floor(rightPercent);
    var chart = new Chartist.Pie('.ct-chart-2', {
        series: arrayCircleX,
        labels: [`${leftPercent}`, `${rightPercent}`]
    }, {
            donut: true,
            showLabel: true
        });

    chart.on('draw', function (data) {
        if (data.type === 'slice') {
            // Get the total path length in order to use for dash array animation
            var pathLength = data.element._node.getTotalLength();

            // Set a dasharray that matches the path length as prerequisite to animate dashoffset
            data.element.attr({
                'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
            });

            // Create animation definition while also assigning an ID to the animation for later sync usage
            var animationDefinition = {
                'stroke-dashoffset': {
                    id: 'anim' + data.index,
                    dur: 1000,
                    from: -pathLength + 'px',
                    to: '0px',
                    easing: Chartist.Svg.Easing.easeOutQuint,
                    // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                    fill: 'freeze'
                }
            };

            // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
            if (data.index !== 0) {
                animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
            }

            // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
            data.element.attr({
                'stroke-dashoffset': -pathLength + 'px'
            });

            // We can't use guided mode as the animations need to rely on setting begin manually
            // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
            data.element.animate(animationDefinition, false);
        }
    });

    // For the sake of the example we update the chart every time it's created with a delay of 8 seconds




    let img = document.createElement('img');
    img.setAttribute('src', `http://10.8.0.10/api/heatMap?cameraId=${globalCameraId}&startTime=0&endTime=1000000000`);
    img.className = "img-anal";

    document.querySelector('.wrapper-img').appendChild(img);
    img.addEventListener('load',()=>{
        img.style.opacity = "1";
        document.querySelector('.load-imgtext').innerHTML = "";
    })
    document.querySelector('.create-anal').addEventListener('click', analHandler);
}

function analHandler() {
    let ot = new Date(document.querySelector('.on-date-anal').value).getTime();
    let to = new Date(document.querySelector('.to-date-anal').value).getTime();
    console.log(ot, to);
    getPlotChoords(ot, to);
}
function viewAllCameras(array) {

    //create wrapper for camera
    wrapperItems.innerHTML = `
    <div class="cameras-about">
        <span>Название</span>
        <span>Описание</span>
    </div>
    `;
    let wrapper = document.createElement('div')
    let addCameras = document.createElement('div')
    addCameras.classList = "add-camers";
    addCameras.innerHTML =
        `
    <h2>
    Добавить камеру
    </h2>
    <div class="add-circle-cameras">+</div>
    `
    wrapper.classList = "cameras-row";
    wrapperItems.appendChild(wrapper);
    // add camera on html
    for (let index = 0; index < array.length; index++) {
        let id = array[index].id;
        let title = array[index].name;
        let descr = array[index].description;
        let newItem = document.createElement('div');
        newItem.classList = 'camera';
        newItem.setAttribute('data-id', id);
        newItem.addEventListener('click', onItemClickCameras);
        newItem.innerHTML =
            `
            <div class="title">${title}</div>
            <div class="description">${descr}</div>
            <div class="extra-menu">
                <span class="open-dd">
                <svg width="34" height="9" viewBox="0 0 34 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="4.04762" cy="4.95237" r="4.04762" fill="#515151"/>
                    <circle cx="16.9998" cy="4.95237" r="4.04762" fill="#515151"/>
                    <circle cx="29.9519" cy="4.95237" r="4.04762" fill="#515151"/>
                </svg>
                </span>
                <div class="drop-down">
                    <li data-del="1">Удалить камеру</li>
                    <li data-del="2">Работа с зонами</li>
                </div>
            </div>
            `;
        wrapper.appendChild(newItem);

    }
    wrapper.appendChild(addCameras);
    checkDD();
    document.querySelector('.add-circle-cameras').addEventListener('click', addCamerasRequest)
}
function checkDD() {
    document.querySelectorAll('.extra-menu').forEach((item) => {
        item.addEventListener('click', DDopen)
    })
}

function addCamerasRequest() {
    wrapperItems.innerHTML = `<h1>Добавьте Камеру</h1>
            <form id="add-obj-form" action="">
                <input class="camera-name" type="text" name="name" placeholder="Название" />
                <input class="camera-url" type="text" name="name" placeholder="URL Камеры" />
                <textarea class="camera-descr" name="descr" id="" cols="30" rows="10" placeholder="Описание"></textarea>
                <button class="add-new-camera">Добавить</button>
            </form>`;
    addeventCameras();
}

function addeventCameras() {
    document.querySelector('.add-new-camera').addEventListener('click', addCamerasS)
}

function addCamerasS(event) {
    event.preventDefault();
    let name = document.querySelector('.camera-name').value;
    let url = document.querySelector('.camera-url').value;
    let descr = document.querySelector('.camera-descr').value;
    let addCard = fetch("http://10.8.0.10/api/addCamera", {
        method: 'POST',
        body: JSON.stringify({
            objectId: `${globalCameraId}`,
            cameraName: `${name}`,
            cameraDescription: `${descr}`,
            cameraUrl: `${url}`
        })
    })
    addCard.then((res) => {
        return res.json();
    })
        .then((result) => {
            getallCameras(globalCameraId);
        })
}

function DDopen(e) {
    if (e.target.className == "extra-menu") {
        if (flagDD) {
            e.target.children[1].style.display = 'block';
            flagDD = false
            checkDDMenu();
        } else {
            e.target.children[1].style.display = 'none';
            flagDD = true;
        }
    }
}

function checkDDMenu() {
    document.querySelectorAll('.drop-down').forEach((item) => {
        item.addEventListener('click', (e) => {
            delCameras(e.target.getAttribute("data-del"), e.target.closest(".camera").getAttribute("data-id"))
        })
    })
}

function delCameras(status, camerasId) {
    fetch("http://10.8.0.10/api/deleteCamera", {
        method: 'POST',
        body: JSON.stringify({
            cameraId: `${camerasId}`,
            objectId: `${globalObjId}`
        })
    })
        .then((res) => {
            return res.json();
        })
        .then((result) => {


            console.log(result)
            getAllObj();
        })
}