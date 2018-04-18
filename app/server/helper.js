
function capFirstLetter(data) {
  if (!data) return '';

  let newArray = [];
  data = data.toString();
  data = data.toLowerCase();

  newArray = data.split(' ');
  newArray = newArray.map(item => item.charAt(0).toUpperCase() + item.slice(1));
  data = newArray.join(' ');

  newArray = data.split(',');
  newArray = newArray.map(item => item.charAt(0).toUpperCase() + item.slice(1));
  data = newArray.join(', ');
  
  return data
};

function isEmail(email) {
  return (/\S+@\S+\.\S+/).test(email);
}


function isUrl(url) {
  if (!url) return false;
  var matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
  return matcher.test(url);
}

function isAdmin(email) {
  if (!email) return false;
  return admins.includes(email)
}

const mansonry = (items, propName) => {
  if (!items || items.length === 0) return[];
  
  return items.reduce(
    (p, c, k) => {
      if (k > 1) {
        if (p.leftHeight <= p.rightHeight) {
          return {
            ...p,
            leftCol: [...p.leftCol, c],
            leftHeight: p.leftHeight + c[propName],
          }
        } else {
          return {
            ...p,
            rightCol: [...p.rightCol, c],
            rightHeight: p.rightHeight + c[propName],
          }
        }
      } else {
        return p
      }
    },
    {
      leftCol: [items[0]],
      rightCol: [items[1]],
      leftHeight: items[0].imageHeight,
      rightHeight: items[1].imageHeight,
    }
  )
}

export {
  capFirstLetter,
  isEmail,
  isUrl,
  isAdmin,
  mansonry,
}