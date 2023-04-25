const sketch = require('sketch')
const { DataSupplier } = sketch
const util = require('util')

// Import the required JSON files
const patientsData = require('./data/patients.json')
const facilitiesData = require('./data/facilities.json')
const teammatesData = require('./data/teammates.json')
const careActivitiesData = require('./data/care-activities.json')

let currentIndex = 0;


// Register the plugin with each menu item
export function onStartup() {
  DataSupplier.registerDataSupplier('public.text', 'Patients', 'SupplyPatientsData')
  DataSupplier.registerDataSupplier('public.text', 'Facilities', 'SupplyFacilitiesData')
  DataSupplier.registerDataSupplier('public.text', 'Teammates', 'SupplyTeammatesData')
  DataSupplier.registerDataSupplier('public.text', 'Care Activities/Categories', 'SupplyCareActivitiesData')
  DataSupplier.registerDataSupplier('public.text', 'About', 'OpenAboutPage')
}

export function onShutdown() {
  DataSupplier.deregisterDataSuppliers()
}

// Functions to handle data supply for each menu item
export function onSupplyPatientsDataAlphabetical(context) {
  if (context.data && context.data.items) {
    supplyData(context, patientsData)
  } else {
    supplyDataToSelectedLayers(context, patientsData, 'alphabetical', 'patientName');
  }
}


export function onSupplyPatientsDataRandom(context) {
  if (context.data && context.data.items) {
    supplyData(context, patientsData)
  } else {
    supplyDataToSelectedLayers(context, patientsData, 'random')
  }
}

export function onSupplyFacilitiesDataAlphabetical(context) {
  if (context.data && context.data.items) {
    supplyData(context, facilitiesData)
  } else {
    supplyDataToSelectedLayers(context, facilitiesData, 'alphabetical', 'facilityName');
  }
}

export function onSupplyFacilitiesDataRandom(context) {
  if (context.data && context.data.items) {
    supplyData(context, facilitiesData)
  } else {
    supplyDataToSelectedLayers(context, facilitiesData, 'random')
  }
}

export function onSupplyTeammatesDataAlphabetical(context) {
  if (context.data && context.data.items) {
    supplyData(context, teammatesData)
  } else {
    supplyDataToSelectedLayers(context, teammatesData, 'alphabetical', 'nameRole');
  }
}

export function onSupplyTeammatesDataRandom(context) {
  if (context.data && context.data.items) {
    supplyData(context, teammatesData)
  } else {
    supplyDataToSelectedLayers(context, teammatesData, 'random')
  }
}

export function onSupplyCareActivitiesDataAlphabetical(context) {
  if (context.data && context.data.items) {
    supplyData(context, careActivitiesData)
  } else {
    supplyDataToSelectedLayers(context, careActivitiesData, 'alphabetical', 'title');
  }
}

export function onSupplyCareActivitiesDataRandom(context) {
  if (context.data && context.data.items) {
    supplyData(context, careActivitiesData)
} else {
  supplyDataToSelectedLayers(context, careActivitiesData, 'random')
  }
}

export function onOpenAboutPage(context) {
  const url = NSURL.URLWithString('https://github.com/eaugustine/village-dummy-data/blob/main/README.md')
  NSWorkspace.sharedWorkspace().openURL(url)
}

const _ = require('lodash')
function getTextLayersRecursively(layer, dataKeys) {
  let textLayers = [];

  if (layer.type === 'Text') {
    const layerKey = layer.name.split('/').pop().trim();
    if (dataKeys.includes(layerKey)) {
      textLayers.push(layer);
    }
  }

  if (layer.layers) {
    layer.layers.forEach(childLayer => {
      textLayers = textLayers.concat(getTextLayersRecursively(childLayer, dataKeys));
    });
  }

  if (layer.type === 'SymbolInstance') {
    const master = layer.master;
    if (master && master.layers) {
      master.layers.forEach(childLayer => {
        textLayers = textLayers.concat(getTextLayersRecursively(childLayer, dataKeys));
      });
    }

    layer.overrides.forEach(override => {
      if (override.property === 'stringValue' && override.affectedLayer.type === 'Text') {
        const layerKey = override.affectedLayer.name.split('/').pop().trim();
        if (dataKeys.includes(layerKey)) {
          textLayers.push(override);
        }
      }
    });
  }

  return textLayers;
}


function applyDataToOverrides(symbolInstance, dataKeys, data) {
  const overrides = symbolInstance.overrides;
  let updatedOverrides = false;

  overrides.forEach(override => {
    if (override.property === 'stringValue') {
      const layerKey = override.affectedLayer.name.split('/').pop().trim();
      if (dataKeys.includes(layerKey)) {
        if (data[layerKey]) {
          symbolInstance.setOverrideValue(override, data[layerKey]);
          updatedOverrides = true;
        } else {
          console.error(`Error: No matching data found for key "${layerKey}".`);
        }
      }
    }
  });

  return updatedOverrides;
}

function getAllChildLayersRecursively(layer) {
  if (!layer.layers) return [layer];
  let childLayers = [];
  layer.layers.forEach((childLayer) => {
    childLayers.push(...getAllChildLayersRecursively(childLayer));
  });
  return childLayers;
}

function supplyDataToSelectedLayers(context, jsonData, order, indexKey = null, currentIndex = 0) {
  const document = sketch.getSelectedDocument();
  const selectedLayers = document.selectedLayers;
  const allSelectedLayers = selectedLayers.layers.flatMap(layer => layer.type === 'Group' ? getAllChildLayersRecursively(layer) : layer);
  const dataLength = jsonData.length;
  const dataKeys = Object.keys(jsonData[0]);

  const getRandomData = () => {
    const randomIndex = Math.floor(Math.random() * dataLength);
    return jsonData[randomIndex];
  };

  const getAlphabeticalData = (currentIndex) => {
    return jsonData[currentIndex % dataLength];
  };

  if (order === 'alphabetical' && indexKey) {
  jsonData.sort((a, b) => a[indexKey].localeCompare(b[indexKey]));
  }

  const sortedSelectedLayers = allSelectedLayers.slice().sort((a, b) => b.index - a.index);

  sortedSelectedLayers.forEach((layer, index) => {
    const textLayers = getTextLayersRecursively(layer, dataKeys);
    let updatedOverrides = false;

    if (layer.type === 'SymbolInstance') {
      const data = order === 'alphabetical' ? getAlphabeticalData(currentIndex) : getRandomData();
      updatedOverrides = applyDataToOverrides(layer, dataKeys, data);
    }

    if (!updatedOverrides) {
      textLayers.forEach((textLayer, textLayerIndex) => {
        if (order === 'alphabetical') {
          currentIndex = index;
        }
        const dataKey = textLayer.name;

        if (dataKey) {
          const data = order === 'alphabetical' ? getAlphabeticalData(currentIndex) : getRandomData();
          if (data[dataKey]) {
            textLayer.text = data[dataKey];
          } else {
            console.error(`Error: No matching data found for key "${dataKey}".`);
          }
        }
      });
    }

    if (order === 'alphabetical') {
      currentIndex++; // Increment the currentIndex
    }
  });
}





// A reusable function to supply data from the JSON files
function supplyData(context, jsonData) {
  if (!context.data || !context.data.items) {
    console.error('Error: No data items provided.')
    return
  }

  const dataKey = context.data.key
  const items = util.toArray(context.data.items).map(sketch.fromNative)
  const dataLength = jsonData.length

  items.forEach((item, index) => {
    const randomIndex = Math.floor(Math.random() * dataLength)
    const data = jsonData[randomIndex]
    DataSupplier.supplyDataAtIndex(dataKey, data[dataKey], index)
  })
}


