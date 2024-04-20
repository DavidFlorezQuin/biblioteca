document.addEventListener('DOMContentLoaded', function () {
    loadData();
    selectPerson();
    selectBook();
    selectBiblio();
  
    document.getElementById("fomulario").addEventListener("submit", function(event){
      event.preventDefault();
    });
  
  });
  
  function save(){
    
   const readerSelect = document.getElementById('readerSelect');
   const readerId = parseInt(readerSelect.value);
   const libroSelect = document.getElementById('bookSelect');   
   const libroId = parseInt(libroSelect.value);

   const biblioSelect = document.getElementById('biblioSelect');

   const biblioId = parseInt(biblioSelect.value);

   const state = parseInt(document.getElementById('estado').value);

   const dateOut = document.getElementById('dateOut').value;

   var formattedDateOfBirth = new Date().toISOString().split('T')[0]; // Obtenemos la fecha actual en formato ISO y la convertimos a cadena

   console.log(formattedDateOfBirth)
   var data = {
     state: state,
     books: [
       {
         id: libroId,
       }
     ],
     reader: {
       id: readerId   
     },
     bibliotecary: {
       id: biblioId
     },
     loanDate: formattedDateOfBirth,
     returnDate: formattedDateOfBirth
   };

   console.log(data)
  
  fetch('http://localhost:9000/library/v1/api/loan', {
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
  
    fetch('http://localhost:9000/library/v1/api/loan/loanPerson', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      var html = '';
  
      const loan = data.data
      
      
      loan.forEach(function (item) {
        html += `<tr>
                <td>`+ item.name + `</td>
                <td>`+ item.prestamos + `</td>
                <td>`+ item.multas + `</td>
                <td>`+ 'Activo' + `</td>
                <th><img src="../assets/icon/search.svg" alt="" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="findByIdModal(`+ item.personId + `)"></th>
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
    fetch('http://localhost:9000/library/v1/api/loan/' + id, {
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
    fetch('http://localhost:9000/library/v1/api/loan/' + id, {
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
        document.getElementById('readerSelect').value = datos.reader.id;
        document.getElementById('bookSelect').value = datos.books.id;
        document.getElementById('biblioSelect').value = datos.bibliotecary.id;
        document.getElementById('estado').value = datos.state  == true ? 1 : 0;
        document.getElementById('dateOut').value = datos.returnDate;
  
        var btnAgregar = document.querySelector('button[name="btnAgregar"]');
        btnAgregar.textContent = 'Actualizar'; // Para cambiar el texto del botón
        btnAgregar.setAttribute('onclick', 'update()'); // Para cambiar el atributo onclick
        
      })
      .catch(error => {
        // Función que se ejecuta si hay un error en la solicitud
        console.error('Error en la solicitud:', error);
      });
  }
  
  function findByIdModal(id) {
    fetch('http://localhost:9000/library/v1/api/loan/loanPersons/' + id, {
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

        var html = '';

  
        const loan = data.data; 

        loan.forEach(function (item) {
          html += `<tr>
                  <td>`+ item.biblio + `</td>
                  <td>`+ item.bookName + `</td>
                  <td>`+ item.returnDay + `</td>
                  <td>`+ (item.state  == true ? 'Activo' : 'Inactivo') + `</td>
                  <th><button onclick="check()" name="btnAgregar" class="btn btn-success submit" data-bs-dismiss="modal">Entregado</button>                  </th>
              </tr>`;
        });

       document.getElementById('resultDataModal').innerHTML = html;


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
    
    fetch('http://localhost:9000/library/v1/api/loan/' + id, {
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
  
  
  function selectBiblio() {
    fetch('http://localhost:9000/library/v1/api/bibliotecary', {
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
      var selectElement = document.getElementById('biblioSelect');
      selectElement.innerHTML = ''; // Limpiar opciones anteriores, si las hay
  
      data = data.data; 
  
      data.forEach(item => {
        // Agregar una opción por cada cliente
        var option = new Option(item.person.firstName, item.id);
        selectElement.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
  }
  
  function selectPerson() {
    fetch('http://localhost:9000/library/v1/api/reader', {
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
      var selectElement = document.getElementById('readerSelect');
      selectElement.innerHTML = ''; // Limpiar opciones anteriores, si las hay
  
      data = data.data; 
  
      data.forEach(item => {
        // Agregar una opción por cada cliente
        var option = new Option(item.person.firstName, item.id);
        selectElement.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
  }

  
  function selectBook() {
    fetch('http://localhost:9000/library/v1/api/book', {
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
      var selectElement = document.getElementById('bookSelect');
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
  
  function clearData() {
    document.getElementById('id').value = '';
    document.getElementById('typeMembership').value = '';
    document.getElementById('outstandingFines').value = '';
    document.getElementById('stateMembership').value = '';
    document.getElementById('personSelect').value = '';
    document.getElementById('estado').value = '';
  }
  
  