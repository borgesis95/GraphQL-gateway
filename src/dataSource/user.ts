import {RESTDataSource} from 'apollo-datasource-rest';

class UserAPI extends RESTDataSource {

    constructor() {
        super();

        // This has to be moved into ENV file
        this.baseURL = 'http://localhost:5000/auth'; 
    }


    /**
     * @description Get users
     * @returns 
     */
    async getAllUsers() {
        return this.get('users');
    }
}

export default UserAPI;