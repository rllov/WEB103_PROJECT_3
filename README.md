# WEB103 Project 4 - Custom World Event Board

Submitted by: Ryan Lov

About this web app: **This web app allows users to view, edit, delete, and manage events in a mystical world setting. Users can explore different locations, view events associated with those locations, and get detailed information about each event. Users can also create new events and customize their details.**

Time spent: **13** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->

- [x] **The web app uses React to display data from the API.**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.**
  - [x] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x] **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT \* FROM tablename;' to display your table contents.**
- [x] **Users can view **multiple** features of the `CustomItem` (e.g. car) they can customize, (e.g. wheels, exterior, etc.)**
- [x] **Each customizable feature has multiple options to choose from (e.g. exterior could be red, blue, black, etc.)**
- [x] **On selecting each option, the displayed visual icon for the `CustomItem` updates to match the option the user chose.**
- [x] **The price of the `CustomItem` (e.g. car) changes dynamically as different options are selected _OR_ The app displays the total price of all features.**
- [x] **The visual interface changes in response to at least one customizable feature.**
- [x] **The user can submit their choices to save the item to the list of created `CustomItem`s.**
- [x] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database.**
- [x] **Users can view a list of all submitted `CustomItem`s.**
- [x] **Users can edit a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can delete a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can update or delete `CustomItem`s that have been created from the detail page.**

### How to run locally

1. Start the server (this will recreate and seed the `events` and `customcars` tables):

```bash
cd server
npm install
npm run reset
npm run start
```

2. Start the client:

```bash
cd client
npm install
npm run dev
```

3. Open the app at `http://localhost:5173` and the API at `http://localhost:3001`.

### Database verification (for graders)

- After running `npm run reset` in `server`, connect to your Postgres instance and run:

```sql
SELECT * FROM customcars;
\d customcars
```

- Include a screenshot of the `\d customcars` output in your submission as proof the table exists and is seeded.

### Implemented CustomCar features

- A new customization page is available at `/customize` where users can pick `color`, `wheels`, `engine`, and optional extras. The UI previews the selected color and shows engine/wheels labels.
- The total price is calculated dynamically as options are chosen.
- The user can save a custom car; saved cars are visible under `/customcars`.
- Server-side validation prevents impossible combos (for example, Electric engine + Offroad wheels) and returns a 400 with a message; the client displays the message.

The following **optional** features are implemented:

- [ ] Selecting particular options prevents incompatible options from being selected even before form submission

The following **additional** features are implemented:

- [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='client/public/CustomizedWorldEvents.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

Here is a youtube link if it does not work:
https://youtu.be/l92__7jK8_g

<!-- Replace this with whatever GIF tool you used! -->

GIF created with ... GIF tool here

<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app or any additional context you'd like to add. - The inconsistent naming conventions were difficult because - Server used hostedBy in the req.body to interact with the client - Server needed to map hostedBy to hosted_by when interacting with the database - On formData objected used hostedBy but the name attribute in the input field was soemtimes hostedby or hosted_by. - Mismatch of the hostedBy, hosted_by, hostedby let the field be undefined or not sent correctly to the server

## License

Copyright [2025] [Ryan Lov]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
