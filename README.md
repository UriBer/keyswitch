KeySwitch

KeySwitch is an open-source browser extension that allows users to dynamically map keys between languages in URLs. The extension is designed for language enthusiasts and anyone who frequently works with multiple languages, providing quick and seamless key mapping.

Features

	•	User-Controlled Language Selection: Users can select both source and target languages from an options menu.
	•	Dynamic Mapping: Automatically maps characters in URLs based on keyboard layouts and transliteration mappings.
	•	Keyboard Shortcut: Quickly activate the mapping with a keyboard shortcut (Ctrl+Shift+M by default).
	•	Privacy-Focused: All processing is done locally within the user’s browser, with no data sent to external servers.

Installation

To install the extension:

	1.	Clone or download the repository to your local machine:
git clone https://github.com/UriBer/keyswitch.git
cd keyswitch
	2.	Open your browser and go to the extensions/add-ons page:
	•	Firefox: Go to about:debugging#/runtime/this-firefox, and click on Load Temporary Add-on…
	•	Chrome: Go to chrome://extensions/, enable Developer Mode, and click on Load unpacked.

Note: This extension is still in development. For a persistent installation, you may want to wait until it’s published on the browser’s official add-ons store

	2.	Open your browser and go to the extensions/add-ons page:
	•	Firefox: Go to about:debugging#/runtime/this-firefox, and click on Load Temporary Add-on…
	•	Chrome: Go to chrome://extensions/, enable Developer Mode, and click on Load unpacked.
	3.	Select the project folder to load the extension.

	Note: This extension is still in development. For a persistent installation, you may want to wait until it’s published on the browser’s official add-ons store.

Usage

	1.	Open the Options Page:
	•	Click on the extension icon in the toolbar and select Options.
	•	Choose your Source Language and Target Language from the dropdown menus.
	2.	Activate Mapping:
	•	Navigate to a webpage, enter a URL, or select text in the browser.
	•	Press Ctrl+Shift+M (or click the extension icon) to activate the key mapping in the URL.
	3.	Supported Languages:
	•	The extension includes mappings for Hebrew and Russian from english, with more to come.

	Example: If the selected source language is English and the target language is Russian, typing “hello” in the URL would map the text to “хелло” based on Russian phonetic equivalents.

Contributing

We welcome contributions from the community! Here’s how you can help:

	1.	Report Bugs: If you encounter issues, please open an issue in the repository with detailed steps to reproduce the problem.
	2.	Suggest Features: If you have ideas for new features or improvements, let us know by opening a feature request issue.
	3.	Submit Pull Requests: For bug fixes, new features, or language mappings, feel free to submit a pull request. Please ensure that your code follows our style guide and is thoroughly tested.

Development

To get started with development:

	1.	Clone the repository and navigate to the project folder.
	2.	Use a code editor to edit the files, and reload the extension in your browser as needed to test changes.
	3.	Make sure to add new language mappings in JSON format under the mappings folder, following the structure of existing mapping files.

License

This project is licensed under the MIT License. See the LICENSE file for more details.

Acknowledgments

Special thanks to all contributors and the open-source community for their valuable feedback and support.

Contact

For questions or support, please reach out to [urib at even-derech-it.com] or open an issue in the repository.

Enjoy using KeySwitch!