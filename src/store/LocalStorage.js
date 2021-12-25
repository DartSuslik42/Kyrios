import Corps from "./json/Corps.json"
class localStorage {
    async getCorporationsIDs(){
        return Corps
    }
}
export default new localStorage()
