This is a challenge project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli) developed by [`Luis Fernando Hernandez`](https://github.com/luishdez87).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Install dependencies

This project was created using npm as package manager.

To install dependencies, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm i

# OR using Yarn
yarn
```

## Step 2: Start the Metro Server

You will need to start Metro, the JavaScript bundler that ships with React Native.

To start Metro, run the following command from the root of your React Native project:

```bash
# using npm
npm run start

# OR using Yarn
yarn start
```

## Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 4: Use the app

Now that you have successfully run the app, let's play!.

1. The landing page is a series list, you can select any of them to see details.
2. In the details page we going to see the serie's picture (if exists), the status of the show and duration in the top of the page, in the bottom we will see a summary and the episodes list by season in a scrollview.
3. After tap an episode it show the episode image if exists and a summary of this episode
4. We can add the serie to a favorites list who is showed in a 2 column grid and takes to the serie landing page.
5. we can define a PIN number to lock the screen, after define the PIN we can modify or slide to lock the screen, when the screen is locked we cannot navigate back in the app with the back button, the app will be closed until this is unlocked.
