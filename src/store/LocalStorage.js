import Corps from "./json/Corps.json"
class localStorage {
    async getCorporations(){
        return Corps
    }
}
export default new localStorage()
