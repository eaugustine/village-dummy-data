# Village Dummy Data Plugin for Sketch

The Village Dummy Data Plugin is a simple and efficient tool for populating your Sketch designs with realistic sample data. With this plugin, you can quickly populate text layers in your design with data from predefined JSON files, saving you time and effort.

## Features

* Populate text layers with data from the following categories:
  * Patients
  * Facilities
  * Teammates
  * Care Activities

* Automatically adjusts the text layers to accommodate the length of the populated data.

* Supports nested symbols and embedded symbols.

* Simple to use, with an easy-to-understand menu.

## Installation

- [Download](../../releases/latest/download/village-dummy-data.sketchplugin.zip) the latest release of the plugin
- Un-zip
- Double-click on village-dummy-data.sketchplugin

## Usage

1. Select one or more text layers or symbols containing text layers in your Sketch file.
2. Go to the Plugins menu, and choose "Village Dummy Data."
3. Select the desired data category (Patients, Facilities, Teammates, or Care Activities) to populate the selected text layers with data from the chosen category.

### Data Files and Layer Naming

To ensure that the plugin populates the correct data, you should name your text layers in Sketch using the keys from the corresponding JSON data files. Below are examples of the key pairs in each data category.

#### Patients Data

Patients are alphabetized by the **patientName** key (last name first). Example key pairs in `patients.json`:

```
{
    "patientName": "Archuleta Borges, Alexandra",
    "gender": "Female",
    "genderabb": "F",
    "age": "65",
    "dob": "07/11/1955",
    "telephone": "(357) 392-4576",
    "initials": "AA",
    "mpi": "3690495",
    "firstName": "Alexandra",
    "lastName": "Archuleta Borges",
    "status": "Active",
    "facility": "Cedar Valley Waverly Dialysis (02196)"
  }
```


#### Facilities Data

Facilities are alphabetized by the **facilityName** key. Example key pairs in `facilities.json`:

```
  {
    "group": "APEX",
    "division": "APEX Hospital Svcs Division",
    "region": "APEX Hospital Svcs Region 03",
    "facilityName": "Kentucky Select Acutes",
    "facilityNumber": 1105,
    "address": "85 N GRAND AVE STE 3",
    "city": "FORT THOMAS",
    "state": "KY",
    "zip": "41075-1793",
    "phone": "(513) 388-6235",
    "fax": "(855) 600-9617",
    "administrator": "Pamela McKnight",
    "modalities": "Acute Hemo 1:1, Acute PD"
  }
```

#### Teammates Data

Teammates are alphabetized by the **nameRole** key. Example key pairs in `teammates.json`:

```
{
    "nameLastFirst": "Bickmore, Ruby",
    "title": "Group Facility Administrator (GFA)",
    "role": "FA",
    "nameFirstLast": "Ruby Bickmore",
    "nameRole": "Ruby Bickmore, FA"
  }
```

#### Care Activities Data

Example key pairs in `care-activities.json`:

```
  {
    "title": "Address patient barriers to return to Home modality",
    "cc": "Modality, Care Coordination",
    "cc1": "Modality",
    "cc2": "Care Coordination",
    "role": "RN",
    "tm": "Geralt DiRivia, RN",
    "sRole": "MSW, RD, RN",
    "pathway": ""
  }
```

## About

You can access the "About" page by selecting "About" from the Plugins menu under "Village Dummy Data."

For more information and support, please visit the [GitHub repository](https://github.com/eaugustine/village-dummy-data/blob/main/README.md).

## License

This plugin is released under the [MIT License](LICENSE).














# Village Dummy Data

## Installation

- [Download](../../releases/latest/download/village-dummy-data.sketchplugin.zip) the latest release of the plugin
- Un-zip
- Double-click on village-dummy-data.sketchplugin

## Development Guide

_This plugin was created using `skpm`. For a detailed explanation on how things work, checkout the [skpm Readme](https://github.com/skpm/skpm/blob/master/README.md)._

### Usage

Install the dependencies

```bash
npm install
```

Once the installation is done, you can run some commands inside the project folder:

```bash
npm run build
```

To watch for changes:

```bash
npm run watch
```

### Custom Configuration

#### Babel

To customize Babel, you have two options:

- You may create a [`.babelrc`](https://babeljs.io/docs/usage/babelrc) file in your project's root directory. Any settings you define here will overwrite matching config-keys within skpm preset. For example, if you pass a "presets" object, it will replace & reset all Babel presets that skpm defaults to.

- If you'd like to modify or add to the existing Babel config, you must use a `webpack.skpm.config.js` file. Visit the [Webpack](#webpack) section for more info.

#### Webpack

To customize webpack create `webpack.skpm.config.js` file which exports function that will change webpack's config.

```js
/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {object} entry - entry property from webpack config
 * @param {boolean} entry.isPluginCommand - whether the config is for a plugin command or a resource
 **/
module.exports = function(config, entry) {
  /** you can change config here **/
};
```

To use the polyfills or the mocks for certain Node.js globals and modules use the `node` property.

Visit [the official documention](https://webpack.js.org/configuration/node/) for available options.

```js
if(entry.isPluginCommand ){
  config.node = {
    setImmediate: false
  }
} else {
  config.node = false;
}
```

### Debugging

To view the output of your `console.log`, you have a few different options:

- Use the [`sketch-dev-tools`](https://github.com/skpm/sketch-dev-tools)
- Open `Console.app` and look for the sketch logs
- Look at the `~/Library/Logs/com.bohemiancoding.sketch3/Plugin Output.log` file

Skpm provides a convenient way to do the latter:

```bash
skpm log
```

The `-f` option causes `skpm log` to not stop when the end of logs is reached, but rather to wait for additional data to be appended to the input

### Publishing your plugin

```bash
skpm publish <bump>
```

(where `bump` can be `patch`, `minor` or `major`)

`skpm publish` will create a new release on your GitHub repository and create an appcast file in order for Sketch users to be notified of the update.

You will need to specify a `repository` in the `package.json`:

```diff
...
+ "repository" : {
+   "type": "git",
+   "url": "git+https://github.com/ORG/NAME.git"
+  }
...
```
