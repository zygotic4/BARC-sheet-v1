const fs = require('fs');

module.exports = (configFile, key, action, element) => { // updateJSON('config.json', 'quota_dusk', 'add', 7);
  let config; 
  try {
    const data = fs.readFileSync(configFile, 'utf8');
    config = JSON.parse(data);
  } catch (err) {
    console.error('Error reading or parsing the configuration file:', err);
    return;
  }

  // Ensure that the key exists in the configuration
  if (!config.hasOwnProperty(key) || !Array.isArray(config[key])) {
    console.error(`Key "${key}" does not exist or is not an array in the configuration.`);
    return;
  }

  // Perform the specified action
  switch (action) {
    case 'add':
      config[key].push(element);
      break;
    case 'remove':
      const index = config[key].indexOf(element);
      if (index !== -1) {
        config[key].splice(index, 1);
      } else {
        console.error(`Element "${element}" not found in the array for key "${key}".`);
        return;
      }
      break;
    default:
      console.error(`Invalid action "${action}". Use "add" or "remove".`);
      return;
  }

  // Save the updated configuration back to the file
  try {
    fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
    console.log(`Successfully ${action}ed element "${element}" in the array for key "${key}".`);
  } catch (err) {
    console.error('Error writing the updated configuration to the file:', err);
  }
}
