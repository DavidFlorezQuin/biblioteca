document.addEventListener('DOMContentLoaded', function () {
  loadData();

  document.getElementById("fomulario").addEventListener("submit", function(event){
    event.preventDefault();
  });

});

function save(){

 const  name = document.getElementById('name').value;
 const age = document.getElementById('age').value;
 

var data = {
  name: name, 
  age: age,
  state: true
};

fetch('http://localhost:9000/library/v1/api/autor', {
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

  fetch('http://localhost:9000/library/v1/api/autor', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    var html = '';

    const autor = data.data

    autor.forEach(function (item) {
      html += `<tr>
              <td>`+ item.name + `</td>
              <td>`+ item.age + `</td>
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
  fetch('http://localhost:9000/library/v1/api/autor/' + id, {
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
  fetch('http://localhost:9000/library/v1/api/autor/' + id, {
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
      document.getElementById('age').value = datos.age;


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
 var  name = document.getElementById('name').value;
 var age = document.getElementById('age').value;
 var id = document.getElementById('id').value;

  
  var data = {
    name: name, 
    age: age,
    state: true
  };
  
  
  var jsonData = JSON.stringify(data);
  
  fetch('http://localhost:9000/library/v1/api/autor/' + id, {
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
  document.getElementById('age').value = '';
}

