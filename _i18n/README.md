i18n [![Crowdin](https://badges.crowdin.net/rva/localized.svg)](https://crowdin.com/project/rva)
===

Re-Volt America uses [Crowdin](https://translate.revolt-america.com) to maintain its extensive amount of translations. Any message, alert, or user interface
should be properly translated using this guide. All translation keys are centralised within the `strings.yml` file. 

If you want to add a new translation key or edit an existing key in English make a PR on Github.
For all other languages, go to our project on Crowdin.

Example
===

Let's say you want to add a new rule to our ruleset.

First, go to `_i18n/strings.yml` and add a new key. Always make sure that the yml path makes sense, and try to keep them
within their section's group, for example, all navbar strings are stored under the `nav.` yml key.

Then, go to your code and use `{ t path.in.strings.yml }` to have it be translated. Note that you only have to add the translation key!
All the locale files (es.yml, pt_br.yml, etc.) are **NOT** to be manually modified, as they come from Crowdin and are added
to the project in batches.
