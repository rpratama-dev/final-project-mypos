

var input = document.getElementById("searchItem");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();  
    let value = input.value; 
    searchItem(value);
    let searchTab = document.getElementById('search'); 
    searchTab.style.display = "block";
    searchTab.click();
  }
});


input.addEventListener("blur", function(event) {
  event.preventDefault();  
  let value = input.value; 
  if (!value) {
    searchItem(value, true);
    let searchTab = document.getElementById('search'); 
    searchTab.style.display = "none"; 
    document.getElementById("defaultOpen").click();  
  }
});

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();  


/**
 * Function Load data 
 */ 
 const CARTBELANJA = {
   countItem: 0, 
   totalPrice: 0,
   id: {}
 }

const MENU = [
  { id: 1, image: 'public/img/pizza.jpg', name: 'Ayam Geprek', price: 15000, categories: 'foods', recomended: true},
  { id: 2, image: 'public/img/pizza.jpg', name: 'Bebek Geprek', price: 23000, categories: 'foods', recomended: true },
  { id: 3, image: 'public/img/pizza.jpg', name: 'Lele Geprek', price: 13000, categories: 'foods', recomended: false },
  { id: 4, image: 'public/img/pizza.jpg', name: 'Nila Geprek', price: 18000, categories: 'foods', recomended: false },
  { id: 5, image: 'public/img/pizza.jpg', name: 'Paket A', price: 20000, categories: 'foods', recomended: false },
  { id: 6, image: 'public/img/pizza.jpg', name: 'Paket B', price: 15000, categories: 'foods', recomended: true },
  { id: 7, image: 'public/img/pizza.jpg', name: 'Paket C', price: 25000, categories: 'foods', recomended: false },
  { id: 8, image: 'public/img/pizza.jpg', name: 'Paket D', price: 28000, categories: 'foods', recomended: false },
  { id: 9, image: 'public/img/pizza.jpg', name: 'Jus Nangka', price: 15000, categories: 'drinks', recomended: false },
  { id: 10, image: 'public/img/pizza.jpg', name: 'Jus Naga', price: 10000, categories: 'drinks', recomended: false },
  { id: 11, image: 'public/img/pizza.jpg', name: 'Jus Pisang', price: 12000, categories: 'drinks', recomended: false },
  { id: 12, image: 'public/img/pizza.jpg', name: 'Jus Sirsak', price: 13000, categories: 'drinks', recomended: false },
  { id: 13, image: 'public/img/pizza.jpg', name: 'Jus Vokad', price: 16000, categories: 'drinks', recomended: true },
 ];

 (function() {
  // your page initialization code here
  // the DOM will be available here
  // alert("document is ready"); 
  loadData(MENU);
})(); 

function loadData(menus) { 
  let template = '';
  let food = '' , drink = '' , recomended = '', search = '';
  for (let i = 0; i < menus.length; i++) {
    let menu = menus[i]; 
    let price = menu.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (menu.recomended) {
      template = `<div class="card" id="card-${menu.id}" onClick="addChoice(${menu.id})"> 
        <img src="${menu.image}" alt="menu" style="width:100%">
          <div class="container">
            <h4><b>${menu.name}</b></h4> 
            <p>Rp${price}</p> 
          </div> 
          <div class="total ${menu.id}" style="display: none;">
            <span class="jumlah">0</span>
          </div> 
      </div>`;
      recomended += template; 
      // console.log('recomended', menu)
     }

     if (menu.categories === 'foods') {
      //  console.log(menu)
      template = `<div class="card" id="card-${menu.id}" onClick="addChoice(${menu.id})"> 
      <img src="${menu.image}" alt="menu" style="width:100%">
        <div class="container">
          <h4><b>${menu.name}</b></h4> 
          <p>Rp${price}</p> 
        </div> 
        <div class="total ${menu.id}" style="display: none;">
          <span class="jumlah">0</span>
        </div> 
      </div>`;
      food += template;
      // console.log('foods', menu)

    } else if (menu.categories === 'drinks') { 
      template = `<div class="card" id="card-${menu.id}" onClick="addChoice(${menu.id})"> 
      <img src="${menu.image}" alt="menu" style="width:100%">
        <div class="container">
          <h4><b>${menu.name}</b></h4> 
          <p>Rp${price}</p> 
        </div> 
        <div class="total ${menu.id}" style="display: none;">
          <span class="jumlah">0</span>
        </div> 
      </div>`;
      drink += template;
      // console.log('recomended', menu)
    }  

    search += template;
  }

  let tabRecomended = document.getElementById("tab-recomended");
  let tabFood = document.getElementById("tab-food");
  let tabDrink = document.getElementById("tab-drink");
  let tabSearch = document.getElementById("tab-search");
  tabRecomended.innerHTML = recomended;
  tabFood.innerHTML = food;
  tabDrink.innerHTML = drink;
  tabSearch.innerHTML = search;
  // console.log(drink); 
  return true;
}


function addChoice(id, action = '+') {
  // alert('id '+ id); 
  let divCard = document.getElementsByClassName('total '+id);
  let price = document.getElementById('card-'+id).children[1].children[1].innerText;
  price = Number(price.replace(',','').substring(2, price.length));
  // console.log(price)
  for (let i = 0; i < divCard.length; i++) { 
    let oldValue = divCard[i].children[0].innerText;
    let divValue = divCard[i].children[0];
    if (action === '+') {
      divValue.innerText = Number(oldValue) + 1;
    } else if (action === '-') {
      divValue.innerText = Number(oldValue) - 1;
    }

    if (Number(divValue.innerText) < 1) {
      divCard[i].style.display = "none"; 
    } else {
      divCard[i].style.display = "block"; 
    }

    // console.log(divCard[0].children[0].innerText)
  }

  if (action === '+') {
    CARTBELANJA.id[id] = (CARTBELANJA.id[id] || 0) + 1;
    CARTBELANJA.totalPrice += price;
    CARTBELANJA.countItem += 1
  } else if (action === '-') {
    CARTBELANJA.id[id] = (CARTBELANJA.id[id] || 0) - 1;
    CARTBELANJA.totalPrice -= price;
    CARTBELANJA.countItem -= 1
  }

  let total = CARTBELANJA.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.getElementById('cart-belanja').innerText = `${CARTBELANJA.countItem} item | Rp${total}`;
  document.getElementById('divCart').style.display = 'block';

  if (!CARTBELANJA.countItem) {
    document.getElementById('divCart').style.display = 'none';
    window.location.href = "#slide-1";
  }
  // console.log(CARTBELANJA.id[id]);

  if (CARTBELANJA.id[id] === 0) {
    delete CARTBELANJA.id[id];
  }
  // console.log(CARTBELANJA)
}

function searchItem(value, clear = false) {
  let container = document.getElementById('tab-search')
  let contenItem = container.getElementsByTagName('h4');
  // console.log(container.children[0])
  
  for (let i = 0; i < contenItem.length; i++) { 
    let itemName = contenItem[i].innerText;
    if (clear) {
      container.children[i].style.display = "block";
    } else if (itemName.toLowerCase().indexOf(value.toLowerCase()) > -1) {
      // console.log('same', itemName)
      container.children[i].style.display = "block";
      // container[i].style.display = "block";
    } else {
      // console.log('not same', itemName)
      container.children[i].style.display = "none";
    } 
    // console.log(container.children[i])
  }
}

function detailCart() { 
  loadDetailPesanan(CARTBELANJA, MENU);
  window.location.href = "#slide-2";
}

function nextSlide(goto){
  window.location.href = goto;
}

function loadDetailPesanan (cartBelanja, menus) {
  let listPesanan = '';
  let key = Object.keys(cartBelanja.id)
  // console.log(key);
  for (let i = 0; i < key.length; i++) {
    let id = key[i];
    for (let j = 0; j < menus.length; j++) {
      // console.log(menus[j].id, Number(id), menus[j].id === Number(id))
      if (menus[j].id === Number(id)) {
        let price = menus[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        listPesanan += `
        <div class="container" id="container-${id}">
          <div class="change-value" style="width: 200px; ">
            <div class="btn-group">
              <button id="btnKurangi-${id}" onclick="ubahTotal(${id}, '+')"><b>+</b></button>
              <button disabled id="btnTotal-${id}">${cartBelanja.id[id]}</button>
              <button id="btnTambah-${id}" onclick="ubahTotal(${id}, '-')"><b>-</b></button>
            </div> 
          </div> 
          <h4 style="padding-left: 9px;" id="itemName-${id}"><b>${menus[j].name}</b></h4> 
          <p style="padding: 0px; margin: 10px;" id="itemPrice-${id}">Rp${price}</p> 
        </div> `;
        break;
      }
    }
  }

  let divListPesanan = document.getElementById('listPesanan');
  let totalItem = document.getElementById('totalItem');
  let totalPrice = document.getElementById('totalPrice'); 
  let price = cartBelanja.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  divListPesanan.innerHTML = listPesanan;
  totalItem.innerText = cartBelanja.countItem + ' item';
  totalPrice.innerText = `Rp${price}`;
  // console.log(listPesanan)
  return true;
}

function ubahTotal(id, action) {
    let totalValue = document.getElementById('btnTotal-'+id);
    let oldValue = Number(totalValue.innerText);
  if (action === '+') {
    totalValue.innerText = oldValue + 1;
  } else if (action === '-') {
    totalValue.innerText = oldValue - 1;
  }
  if (totalValue.innerText == 0) {
    document.getElementById("container-" + id).style.display = 'none';
  }
  addChoice(id, action);
}

function loadPembayaran(cartBelanja = CARTBELANJA) {
  nextSlide('#slide-3');
  let totalTransaksi = document.getElementById('totalTransaksi');
  let price = cartBelanja.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  totalTransaksi.innerText = `Rp${price}`;

}

function clearAllValue() { 
  CARTBELANJA.countItem = 0;
  CARTBELANJA.totalPrice = 0;
  CARTBELANJA.id = {}; 
  // console.log('cart belanja', CARTBELANJA);
  clearPembayaran();
  clearChoice();
  clearDetailTransaction();
}

function clearPembayaran() { 
  document.getElementById('uangPembayaran').value = 'Rp0';
  document.getElementById('totalTransaksi').innerText = 'Rp0';
  document.getElementById('btnUangRecomended1').innerText = 'Rp0';
  document.getElementById('btnUangRecomended2').innerText = 'Rp0';
  document.getElementById('kembalian').innerText = 'Kembalian Rp0'; 
}

function clearChoice() { 
  let divCard = document.getElementsByClassName('total');
  // console.log(divCard);
  for (let i = 0; i < divCard.length; i++) { 
    let oldValue = divCard[i].children[0].innerText;
    let divValue = divCard[i].children[0]; 
    divValue.innerText = '';
    divCard[i].style.display = "none";  
    document.getElementById('cart-belanja').innerText = `0 item | Rp0`;
    document.getElementById('divCart').style.display = 'none'; 
  }
}

function clearDetailTransaction() {
  document.getElementById('listPesanan').innerHTML = '';  
  document.getElementById('totalItem').innerText = '0 item';
  document.getElementById('totalPrice').innerText = 'Rp0'; 
}

function formatTextPembayaran(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function tampilkanStruk(totalBayar, kembalian, cartBelanja = CARTBELANJA, menus = MENU) {
  let divDateTime = document.getElementById('date-time');
  let divUniqueID = document.getElementById('unique-id');
  let divItemDetail = document.getElementById('itemDetail');
  let divSubTotalItem = document.getElementById('sub-total-item');
  let divCountItem = document.getElementById('count-item');
  let divSubTotalAll = document.getElementById('sub-total-all');
  let divTotalAll = document.getElementById('total-all');
  let divTotalBayar = document.getElementById('total-bayar');
  let divSisaKembalian = document.getElementById('sisa-kembalian');
  let tempDetail = '';
  let IDs = Object.keys(cartBelanja.id);
  console.log(IDs)
  for (let i = 0; i < IDs.length; i++) {
    let id = IDs[i];
    for (let j = 0; j < menus.length; j++) {
      let objMenu = menus[j];
      // console.log(id, objMenu.id)
      if (Number(id) === objMenu.id) {
        tempDetail += `
        <div class="item-name">${objMenu.name}</div> 
        <div class="item">
          Rp${formatTextPembayaran(objMenu.price)}
          <div style="float: right;">${cartBelanja.id[id]}x</div>
        </div>`;
        console.log(objMenu);
        break;
      }
    }
  }
  // console.log(totalBayar, kembalian)
  divDateTime.innerText = getFormatDateTime();
  divItemDetail.innerHTML = tempDetail;
  divUniqueID.innerText = 'Order ID : '+ Date.now();
  divSubTotalItem.innerText = `Rp${formatTextPembayaran(cartBelanja.totalPrice)}`;
  divCountItem.innerText = cartBelanja.countItem;
  divSubTotalAll.innerText = `Rp${formatTextPembayaran(cartBelanja.totalPrice)}`;
  divTotalAll.innerText = `Rp${formatTextPembayaran(cartBelanja.totalPrice)}`;
  divTotalBayar.innerText = `Rp${formatTextPembayaran(totalBayar)}`;
  divSisaKembalian.innerText = `Rp${formatTextPembayaran(kembalian)}`;;

  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

function prosesPembayaran(cartBelanja = CARTBELANJA) {
  let totalPrice = cartBelanja.totalPrice;
  let pembayaran = document.getElementById('uangPembayaran').value; 
  pembayaran = Number(pembayaran.substring(2).replace(',','')); 
  // console.log(cartBelanja);   
  if (cartBelanja.countItem < 1) {
    alert('Tidak ada data belanja!');
    return false;
  }
  let kembalian = pembayaran - totalPrice;
  if (!pembayaran) {
    alert('Masukkan nilai uang pembayaran!');
  } else if (kembalian < 0) {
    alert('Uang pembayaran masih kurang!');
  } else {
    alert('Pembayaran berhasil! Uang kembalian: ' + kembalian);
    tampilkanStruk(pembayaran, kembalian);
    clearAllValue();
  } 
}

function getFormatDateTime() {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date+' '+time;
}

function pilihUang(buttonName, cartbelanja = CARTBELANJA) {
  let btn = document.getElementById(buttonName); 
  let textPembayaran = document.getElementById('uangPembayaran');
  textPembayaran.readOnly = true;
  textPembayaran.type = 'text';
  let btnPembayaran = btn.innerText;
  let uangPembayaran = 0;
  
  if (buttonName === 'btnUangRecomended1' || buttonName === 'btnUangRecomended2') {
    btnPembayaran = btnPembayaran.substring(2, btnPembayaran.length);
    uangPembayaran = Number(btnPembayaran.replace(',',''));
  } else {
    if (buttonName === 'btnUangPas') {
      uangPembayaran = cartbelanja.totalPrice;
    } else { 
      textPembayaran.readOnly = false;
      textPembayaran.focus();
      textPembayaran.type = 'number';
      uangPembayaran = '';
      hitungSisa();
    }
  }
 
  // console.log(uangPembayaran, cartbelanja.totalPrice)
  if (typeof uangPembayaran === 'number') { 
    hitungSisa(uangPembayaran, cartbelanja.totalPrice)
    textPembayaran.value = 'Rp' + formatTextPembayaran(uangPembayaran);
  } 

} 

function hitungSisa(pembayaran = 0, totalPrice = 0) {
  if (typeof pembayaran === 'number') { 
    let divKembalian = document.getElementById('kembalian');
    let kembalian = pembayaran - totalPrice; 
    if (kembalian < 0) {
      divKembalian.innerText = `Uang pembayaran tidak cukup!`; 
    } else {
      divKembalian.innerText = `Kembalian Rp${formatTextPembayaran(kembalian)}`; 
    }
    return kembalian; 
  }
  return 0;
}

let textPembayaran = document.getElementById('uangPembayaran');
textPembayaran.addEventListener("keyup", function(event) {
  event.preventDefault();   
  hitungSisa(Number(textPembayaran.value), CARTBELANJA.totalPrice);
});

textPembayaran.addEventListener("blur", function(event) {
  event.preventDefault();   
  let value = textPembayaran.value; 
  if (Number(value) === NaN) {
    value = 0;
  }
  // console.log(Number(value));
  textPembayaran.type = 'text';
  textPembayaran.readOnly = true;
  textPembayaran.value = 'Rp' + formatTextPembayaran(Number(value));
});

function generateRecomendedUang (uang) {
  let pecahan = [5000, 10000, 20000, 50000, 100000];

}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  window.location.href = '#slide-1';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    window.location.href = '#slide-1';
  }
}