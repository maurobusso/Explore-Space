document.querySelector('#img').addEventListener('click', getDailyPic)
document.querySelector('#mars-btn').addEventListener('click', getImg)

// api_key=CXXAK22dTXAyMSz3hgggh5vaozq4qYbLD874klUW

//asteroids info

function getAsteroidsInfo(){
    const url = `https://api.nasa.gov/neo/rest/v1/feed?api_key=CXXAK22dTXAyMSz3hgggh5vaozq4qYbLD874klUW`
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        // console.log(arr)
        // console.log(arr[`${date}`])

        let date = new Date().toISOString().slice(0,10)
        
        let arr = data.near_earth_objects
        let arrOfPotentialDanger = arr[`${date}`]
        
        
        let dangerousAsteroids = []
        
        for(let i = 0; i<arrOfPotentialDanger.length; i++){
            // console.log(arrOfnearObject[i].is_potentially_hazardous_asteroid)
            let danger = arrOfPotentialDanger[i].is_potentially_hazardous_asteroid
            if(danger === true){
                dangerousAsteroids.push(arrOfPotentialDanger[i])
            }
        }
        
        console.log(dangerousAsteroids)

        document.querySelector('#number-of-asteroids').innerHTML += data.element_count
        document.querySelector('#dangerous-asteroids').innerHTML += dangerousAsteroids.length
        
        if(dangerousAsteroids.length <= 1){
            const name = dangerousAsteroids[0].name
            const diameter = dangerousAsteroids[0].estimated_diameter.meters.estimated_diameter_max.toFixed(2)
            const speed = parseFloat(dangerousAsteroids[0].close_approach_data[0].relative_velocity.kilometers_per_second).toFixed(1)

            const asteroidsInfo = `
                Name: ${name}<br>
                Max diameter: ${diameter} m<br>
                Speed: ${speed} Km/s<br>
                --------------------------------<br>
                `
            document.querySelector('#list-of-dangerous-asteroids').innerHTML += asteroidsInfo;             
        }else{
            for(let i = 0; i<dangerousAsteroids.length; i++){
                const name = dangerousAsteroids[0].name
                const diameter = dangerousAsteroids[0].estimated_diameter.meters.estimated_diameter_max.toFixed(2)
                const speed = parseFloat(dangerousAsteroids[0].close_approach_data[0].relative_velocity.kilometers_per_second).toFixed(1)

                const asteroidsInfo = `
                    Name: ${name}<br>
                    Max diameter: ${diameter} m<br>
                    Speed: ${speed} Km/s<br>
                    --------------------------------<br>
                    `
                document.querySelector('#list-of-dangerous-asteroids').innerHTML += asteroidsInfo;
            }
        }    
    })
    .catch(err => {
        let error = "sorry, there are no data available"
        document.querySelector('#asteroid-info').innerHTML = error
        console.log(`error ${err}`)
    })
}

getAsteroidsInfo()


// image of the day

function getDailyPic(){
    document.querySelector('#today-img').src = ''

    const todayDate = new Date()
    const choice = document.querySelector('#daily-img').value
    let choiceDate = new Date(choice)
    
    const url = `https://api.nasa.gov/planetary/apod?api_key=CXXAK22dTXAyMSz3hgggh5vaozq4qYbLD874klUW&date=${choice}`

    displayLoading()
    
    //this handle date if input is in the future
    if(choiceDate > todayDate){
        console.log('sorry that is the future')
        document.querySelector('#today-img').src = ''
        document.querySelector('#explanation').innerText = ``
        document.querySelector('#title').innerText = `Sorry you can't select dates that are in the future!`
        hideLoading()
    }else{
        //handle video types
        fetch(url)
            .then(res => res.json())
            .then(data => {
                hideLoading()
                console.log(data)
                document.querySelector('#today-img').src = data.hdurl
                document.querySelector('#explanation').innerText = `${data.explanation}`
                document.querySelector('#title').innerText = `Title: ${data.title}`

            })
            .catch(error => {
                let err = "sorry, there are no pictures available for this date, try to pick a different one."
                console.log(`error ${err}`)
            })
    }
}

//display and hide loading animation for daily image

function displayLoading(){
    const loader = document.querySelector('#loading')
    loader.classList.remove('invisible')
}

function hideLoading(){
    const loader = document.querySelector('#loading')
    loader.classList.add('invisible')
}


//Mars rover api

function getImg(){
        document.querySelector('#mars-img').src = ''
        displayLoadingMarsImg()

        let rover = 'curiosity'
        let randomRover = Math.floor(Math.random() * 3 ) + 1
        if(randomRover == 1){
            rover = 'curiosity'
        }else if(randomRover == 2){
            rover = 'Opportunity'
        }else{
            rover = 'Spirit'
        }

        let sol = Math.floor(Math.random() * 1000 ) + 1
    

    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?api_key=CXXAK22dTXAyMSz3hgggh5vaozq4qYbLD874klUW&sol=${sol}`
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            hideLoadingMarsImg()
            const randomNumber = Math.floor(Math.random() * data.photos.length ) + 1

            let image = data.photos[randomNumber].img_src

            if(data.photos.length == 0){
                getImg()
            }
            
            document.querySelector('#mars-img').src = image

            let camera = data.photos[randomNumber].camera.full_name
            let roverName = data.photos[randomNumber].rover.name
            let earth_date = data.photos[randomNumber].earth_date

            document.querySelector('#roverName').innerText =  `This picture was taken by ${roverName}`
            document.querySelector('#earth_date').innerText = `On the ${earth_date}`
            document.querySelector('#camera').innerText = `From the ${camera}` 
        })
        .catch(err => {
            let error = "sorry, there are no info available for this pictures"
            document.querySelector('#info').innerHTML = error
            console.log(`error ${err}`)
        })


    }

    //display and hide loading animation for mars rover images
    
    function displayLoadingMarsImg(){
        const loaderMars = document.querySelector('#loading-mars-img')
        loaderMars.classList.remove('invisible')
    }
    
    function hideLoadingMarsImg(){
        const loaderMars = document.querySelector('#loading-mars-img')
        loaderMars.classList.add('invisible')
    }
