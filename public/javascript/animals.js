fetch('/animals.json')  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        return response.json
      }

       response.json().then(function(data) {  
        console.log(data);  
      });  
    }  
  )  

  .catch(function(err) {  
    console.log('Fetch Error ', err);  
  });
