let requiredData= [
                        {
                            id:1,
                            name:'Anil',
                            createdAt:'123123'
                        },
                        {
                            id:2,
                            name:'Sunil',
                            createdAt:'1829873'
                        }
                    ];



let oldaoo = [
                {
                    "id": 2,
                    "attributes": {
                        "name": "SUNIL",
                        "createdAt": "2023-03-02T03:21:51.069Z",
                        "updatedAt": "2023-03-02T03:21:51.723Z",
                        "publishedAt": "2023-03-02T03:21:51.721Z"
                    }
                },
                {
                    "id": 3,
                    "attributes": {
                        "name": "Rakesh",
                        "createdAt": "2023-03-02T03:25:33.678Z",
                        "updatedAt": "2023-03-02T03:25:33.678Z",
                        "publishedAt": "2023-03-02T03:25:33.676Z"
                    }
                },
                {
                    "id": 4,
                    "attributes": {
                        "name": "Vishnu",
                        "createdAt": "2023-03-02T03:26:50.768Z",
                        "updatedAt": "2023-03-02T03:26:50.768Z",
                        "publishedAt": "2023-03-02T03:26:50.766Z"
                    }
                }
            ];

console.log('before map function ->',oldaoo);

let newoldaoo = oldaoo.map((cv,idx,arr)=>{
    return {
                id:cv.id,
                name:cv.attributes.name,
                createdAt:cv.attributes.createdAt
            }
});

console.log('after map funtion ->',newoldaoo);
