const APIHOST = __DEV__ ? 
  'http://localhost:5000' : 'https://serene-hollows-62567.herokuapp.com';
  
// POST
async function getItems() {
  console.log('getItems is invoked');

  try {
    let response = await fetch(`${APIHOST}/v1/item/get/all/hunt`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': auth,
      }
    })
    let data = await response.json();
    if (data.statusCode !== 200) {
      console.log('getItems ERROR', data.data);
      return Promise.reject(data.data)
    } else {
      console.log('getItems RESULT');
      return Promise.resolve(data.data)
    }
  } catch (error) {
    console.log('getItems ERROR', error)
  }
}

export {
  getItems,
}
