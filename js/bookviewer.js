export class BookViewer {

    constructor(data, base) {
        this.base = base;
        this.search_base = 'https://openlibrary.org/search.json?isbn=';
        this.data = data;
        this.index = 0;

        this.irudia = document.getElementById("irudia");
        this.egilea = document.getElementById("egilea");
        this.izenburua = document.getElementById("izenburua");
        this.dataElem = document.getElementById("data");
        this.isbn = document.getElementById("isbn");
        this.liburuKopuru = document.getElementById("liburuKopuru");

        this.initButtons();
        this.updateView();
    }

    initButtons() {
        // aurrera, atzera eta bilatu botoiak hasieratu
        // bilatu botoia sakatzean, erabiltzaileak sartu duen isbn-a duen liburua lortu
        // eta handleSearchData funtzioa exekutatu
        let atz = document.getElementById('atzera')
        let aur = document.getElementById('aurrera')
        let bil = document.getElementById('bilatu')
        bil.onclick = () => {
            let isbn = document.getElementById('isbn')
            fetch(this.search_base+isbn.value).then(r=>r.json()).then(this.handleSearchData)
        } 
        atz.onclick = () =>{
            this.prevBook()
        }
        aur.onclick = () =>{
            this.nextBook()
        }
        
    }

    extractBookData = (book) => {
        // json objektu egoki bat bueltatu, zure webgunean erabili ahal izateko
        let liburuOndo= {'isbn': book.isbn[0], 'egilea': book.author_name[0], 'data': book.publish_date[0], 'izenburua': book.title, 'filename': book.cover_i +'-M.jpg'}
        return liburuOndo;
      };
      
    addBookToData = (book, data) => {
        // data array-ean sartu liburua, eta liburu berriaren posizioa bueltatu
        this.data.push(book);
        return data.length-1;
    };

    handleSearchData = (data) => {
        // lortu liburua data objektutik
        // extractBookData eta addBookToData funtzioak erabili, indizea berria lortuz
        // updateView funtzioa erabili, liburu berria bistaratzeko
        let liburu = data.docs[0]
        let liburuOndo = this.extractBookData(liburu)
        this.index= this.addBookToData(liburuOndo, this.data)
        this.updateView()


    };

    updateView() {
        // liburuaren datu guztiak bistaratu
        // liburu kopurua bistaratu
        this.izenburua.value=this.data[this.index].izenburua
        this.egilea.value=this.data[this.index].egilea
        this.isbn.value=this.data[this.index].isbn
        this.dataElem.value=this.data[this.index].data
        this.irudia.src=this.base+this.data[this.index].filename
        this.liburuKopuru.innerText=this.data.length
        console.log(this.index)

    }

    nextBook() {
        // Hurrengo indizea lortu eta updateView funtzioa erabili bistaratzeko
        // ez ezazu liburu kopurua gainditu
        if(this.index==this.data.length-1){
            console.log('Ez dago gehiagorik')
        }else{
            this.index=this.index+1
        }
        this.updateView()
    }

    prevBook() {
        // Aurreko indizea lortu eta updateView funtzioa erabili bistaratzeko
        // ez ezazu 0 indizea gainditu
        if(this.index==0){
            console.log('Ez dago gehiagorik')
        }else{
            this.index=this.index-1
            this.updateView()
        }
        
    }
}
