document.addEventListener('DOMContentLoaded', function () {
  loadData();

  document.getElementById("fomulario").addEventListener("submit", function(event){
    event.preventDefault();
  });

});

function save(){

 const  firstName = document.getElementById('first_name').value;
 const lastName = document.getElementById('last_name').value;
 const phone = document.getElementById('phone').value;
 const email = document.getElementById('email').value;
 const nit = document.getElementById('nit').value;

var data = {
  firstName: firstName, 
  lastName: lastName,
  phone: phone, 
  email: email,
  document: nit, 
  state: true
};

fetch('http://localhost:9000/library/v1/api/person', {
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

  fetch('http://localhost:9000/library/v1/api/person', {
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
              <td>`+ item.firstName + `</td>
              <td>`+ item.lastName + `</td>
              <td>`+ item.email + `</td>
              <td>`+ item.phone + `</td>
              <td>`+ item.document + `</td>
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
  fetch('http://localhost:9000/library/v1/api/person/' + id, {
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
  fetch('http://localhost:9000/library/v1/api/person/' + id, {
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
      document.getElementById('first_name').value = datos.firstName;
      document.getElementById('last_name').value = datos.lastName;
      document.getElementById('email').value = datos.email;
      document.getElementById('phone').value = datos.phone;
      document.getElementById('nit').value = datos.document;

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

  // Construir el objeto data
 var  firstName = document.getElementById('first_name').value;
 var lastName = document.getElementById('last_name').value;
 var phone = document.getElementById('phone').value;
 var email = document.getElementById('email').value;
 var nit = document.getElementById('nit').value;
 var id = document.getElementById('id').value;

  
  var data = {
    firstName: firstName, 
    lastName: lastName,
    phone: phone, 
    email: email,
    document: nit, 
    state: true
  };
  
  
  var jsonData = JSON.stringify(data);
  
  fetch('http://localhost:9000/library/v1/api/person/' + id, {
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
  document.getElementById('first_name').value = '';
  document.getElementById('last_name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('nit').value = '';
  document.getElementById('estado').value = '';
}

