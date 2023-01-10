
# VFS Iran crawler

This is a very simple Crawler for VFS Global booking system. you can use it to login to VFS and get a new appointment.

## Project setup

first install all dependencies:

```
npm install
```

then you need to add an .env file 

You can use my captch api token for test. please do not over use it or use it for other purposes. it's only for test apps.

```
CAPTCHA_SERVER_BASE_API=https://api.anycaptcha.com
CAPTCHA_SERVER_API_TOKEN=0e819916b2290052cd066c68014a4282

# change this to proper vfs system you want. I used Iran netherlands by default as I need it for invite people from Iran at first
VFS_BASE_URL=https://row7.vfsglobal.com/Global-Appointment/Account/RegisteredLogin?q=shSA0YnE4pLF9Xzwon/x/MI24mBrB3J1rBC1vdDKa5IQdrJXKYTs+DdVJBpH9l4l7y9kr9wkS1P1QdJpp0GPog==

# create a vfs account and add to here
VFS_USER_NAME
VFS_PASSWORD

# your desired port to run sample app
PORT=3003

```


then you can run or build the app for production or test env:


### Compiles and hot-reloads for development
```
npm run build:watch
```

### Compiles and minifies for production
```
npm run build
```


## Libraries and frameworks:

 
1 - ExpressJS (just to create sample endpoint)

2 - Puppeteer - Headless browser to crawl the website



  

## TODO:

- Documenting in a better way
- The appointment system is not easy to crawl. you need to create multiple accounts to bypass them.
- Write tests. 
- Add Typescript support


# support
I'm not working on this repo anymore but if you have questions or something, I will be happy to help, contact me via: mhos.malek@gmail.com and I will try to help as much as I can.

Hope it's still OK and can b for anyone:)
  
