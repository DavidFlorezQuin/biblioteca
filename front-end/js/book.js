document.addEventListener('DOMContentLoaded', function () {
  loadData();
  selectPerson();

  document.getElementById("fomulario").addEventListener("submit", function(event){
    event.preventDefault();
  });

});

function save(){

 const name = document.getElementById('name').value;
 const pages = document.getElementById('pages').value;
 const stock = document.getElementById('stock').value;
 const state = document.getElementById('estado');
 const estadoValor = parseInt(state.value);
 const personSelect = document.getElementById('autorSelect');
 const personId = parseInt(personSelect.value);

var data = {
  state: estadoValor,
  name: name,
  pages: pages,
  stock: stock,
  autor: {
    id: personId
  }
};

fetch('http://localhost:9000/library/v1/api/book', {
  method: 'POST',

  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
  alert("Registro agregado con éxito");
  
  loadData();
  clearData();
})
.catch(error => {
  console.error('Error en la solicitud:', error);
});

};


function loadData() {

  fetch('http://localhost:9000/library/v1/api/book', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    var html = '';

    const book = data.data

    book.forEach(function (item) {
      html += `<tr>
              <td>`+ item.name + `</td>
              <td>`+ item.pages + `</td>
              <td>`+ item.stock + `</td>
              <td>`+ item.autor.name + `</td>
              <td>`+ (item.state == true ? 'Activo' : 'Inactivo') + `</td>
              <th><img src="../assets/icon/pencil-square.svg" alt="" onclick="findById(`+ item.id + `)"></th>
              <th><img src="../assets/icon/trash3.svg" alt="" onclick="deleteById(`+ item.id + `)"></th>
          </tr>`;
    });

    document.getElementById('resultData').innerHTML = html;
  })
  .catch(error => {
    // Función que se ejecuta si hay un error en la solicitud
    console.error('Error en la solicitud:', error);
  });

};

function deleteById(id) {
  fetch('http://localhost:9000/library/v1/api/book/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo eliminar el registro');
    }
    return response.json();
  })
  .then(data => {
    alert('Registro eliminado con éxito');
    loadData();
    clearData();
  })
  .catch(error => {
    console.error('Error:', error);
  });
}


function findById(id) {
  fetch('http://localhost:9000/library/v1/api/book/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })

    
    .then(data => {

      const datos = data.data; 

      document.getElementById('id').value = datos.id;
      document.getElementById('name').value = datos.name;
      document.getElementById('stock').value = datos.stock;
      document.getElementById('pages').value = datos.pages;
      document.getElementById('estado').value = datos.state  == true ? 1 : 0;
      document.getElementById('autorSelect').value = datos.autor.id;

      var btnAgregar = document.querySelector('button[name="btnAgregar"]');
      btnAgregar.textContent = 'Actualizar'; // Para cambiar el texto del botón
      btnAgregar.setAttribute('onclick', 'update()'); // Para cambiar el atributo onclick
      
    })
    .catch(error => {
      // Función que se ejecuta si hay un error en la solicitud
      console.error('Error en la solicitud:', error);
    });
}




function selectPerson() {
  fetch('http://localhost:9000/library/v1/api/autor', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    var selectElement = document.getElementById('autorSelect');
    selectElement.innerHTML = ''; // Limpiar opciones anteriores, si las hay

    data = data.data; 

    data.forEach(item => {
      // Agregar una opción por cada cliente
      var option = new Option(item.name, item.id);
      selectElement.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error en la solicitud:', error);
  });
}

function update() {

  const name = document.getElementById('name').value;
  const pages = document.getElementById('pages').value;
  const stock = document.getElementById('stock').value;
  const state = document.getElementById('estado');
  const estadoValor = parseInt(state.value);
  const personSelect = document.getElementById('autorSelect');
  const personId = parseInt(personSelect.value);
 
 var data = {
   state: estadoValor,
   name: name,
   pages: pages,
   stock: stock,
   autor: {
     id: personId
   }
 };
  
  
  var jsonData = JSON.stringify(data);
  
  fetch('http://localhost:9000/library/v1/api/book/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.statusText);
    }
    return response.json();
  })
  .then(result => {
    alert('Registro actualizado con éxito');
    loadData();
    clearData();
    
    var btnAgregar = document.querySelector('button[name="btnAgregar"]');
    btnAgregar.textContent = 'Agregar';
    btnAgregar.setAttribute('onclick', 'save()');
  })
  .catch(error => {
    console.error('Error en la solicitud:', error);
  });
}


function clearData() {
  document.getElementById('id').value = '';
  document.getElementById('name').value = '';
  document.getElementById('stock').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('autorSelect').value = '';
  document.getElementById('estado').value = '';
}

