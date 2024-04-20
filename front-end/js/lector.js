document.addEventListener('DOMContentLoaded', function () {
  loadData();
  selectPerson();

  document.getElementById("fomulario").addEventListener("submit", function(event){
    event.preventDefault();
  });

});

function save(){

 const  typeMembership = document.getElementById('typeMembership').value;
 const outstandingFines = document.getElementById('outstandingFines').value;
 const state = document.getElementById('estado');
 const estadoValor = parseInt(state.value);
 const personSelect = document.getElementById('personSelect');
 const personId = parseInt(personSelect.value);

var data = {
  typeMembership: typeMembership, 
  outstandingFines: outstandingFines,
  stateMembership: estadoValor, 
  person : {
    id: personId
  } ,
  state: true
};

fetch('http://localhost:9000/library/v1/api/reader', {
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

  fetch('http://localhost:9000/library/v1/api/reader', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    var html = '';

    const person = data.data

    person.forEach(function (item) {
      html += `<tr>
              <td>`+ item.person.firstName + `</td>
              <td>`+ item.typeMembership + `</td>
              <td>`+ item.outstandingFines + `</td>
              <td>`+ (item.stateMembership  == true ? 'Activo' : 'Inactivo') + `</td>
              <th><img src="../assets/icon/pencil-square.svg" alt="" onclick="findById(`+ item.id + `)"></th>
              <th><img src="../assets/icon/trash3.svg" alt="" onclick="deleteById(`+ item.id + `)"></th>
              <th><img src="../assets/icon/search.svg" alt="" onclick="serchBooks(`+ item.id + `)"></th>
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
  fetch('http://localhost:9000/library/v1/api/reader/' + id, {
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
  fetch('http://localhost:9000/library/v1/api/reader/' + id, {
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
      document.getElementById('typeMembership').value = datos.typeMembership;
      document.getElementById('outstandingFines').value = datos.outstandingFines;
      document.getElementById('estado').value = datos.state  == true ? 1 : 0;
      document.getElementById('personSelect').value = datos.person.id;

      var btnAgregar = document.querySelector('button[name="btnAgregar"]');
      btnAgregar.textContent = 'Actualizar'; // Para cambiar el texto del botón
      btnAgregar.setAttribute('onclick', 'update()'); // Para cambiar el atributo onclick
      
    })
    .catch(error => {
      // Función que se ejecuta si hay un error en la solicitud
      console.error('Error en la solicitud:', error);
    });
}


function update() {

  let  id = document.getElementById('id').value;

  let  typeMembership = document.getElementById('typeMembership').value;
  let outstandingFines = document.getElementById('outstandingFines').value;
 
  let state = document.getElementById('estado');
  let estadoValor = parseInt(state.value);
 
  let personSelect = document.getElementById('personSelect');
  let personId = parseInt(personSelect.value);
 
 var data = {
   typeMembership: typeMembership, 
   outstandingFines: outstandingFines,
   stateMembership: estadoValor, 
   person : {
     id: personId
   } ,
   state: true
 };
  
  var jsonData = JSON.stringify(data);
  
  fetch('http://localhost:9000/library/v1/api/reader/' + id, {
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

fetch('http://localhost:9000/library/v1/api/enum/memberships',{
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al enviar los datos");
    }
    return response.json();
  })
  .then((data) => {

    const selectElement1 = document.getElementById("typeMembership");

    // Iterar sobre los datos recibidos y crear las opciones para ambos selects
    data.forEach((data) => {
      const option1 = document.createElement("option");
      option1.value = data;
      option1.text = data;
      selectElement1.appendChild(option1);
    });
  })
  .catch((error) => {
    console.error("Error al enviar los datos:", error);
  });



function selectPerson() {
  fetch('http://localhost:9000/library/v1/api/person', {
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
    var selectElement = document.getElementById('personSelect');
    selectElement.innerHTML = ''; // Limpiar opciones anteriores, si las hay

    data = data.data; 

    data.forEach(item => {
      // Agregar una opción por cada cliente
      var option = new Option(item.firstName, item.id);
      selectElement.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error en la solicitud:', error);
  });
}

function clearData() {
  document.getElementById('id').value = '';
  document.getElementById('typeMembership').value = '';
  document.getElementById('outstandingFines').value = '';
  document.getElementById('stateMembership').value = '';
  document.getElementById('personSelect').value = '';
  document.getElementById('estado').value = '';
}

