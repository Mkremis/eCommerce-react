const loaderDashboard = async ({params}) => {
    const {username, token} = params;
    const options = {
        method: "GET",
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', },
      };
      const endpoint = `https://ecommerce-users-api-production.up.railway.app/api/users/${username}`;
      const response = await fetch(endpoint, options).then(res=>res.json())
      const userData = await response.user;
      let user = {};
      for (const key in userData) {
       let keys = key.split("_");
       let val = {[keys[1]]:userData[key]};
       user[keys[0]]={...user[keys[0]], ...val};
      }
      return user; 
  };
  export default loaderDashboard;