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

