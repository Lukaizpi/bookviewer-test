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
            fetch(this.search_base+isbn).then(r=>r.json()).then(this.handleSearchData)
        } 
        
    }

    extractBookData = (book) => {
        // json objektu egoki bat bueltatu, zure webgunean erabili ahal izateko
        let liburuOndo= {'isbn': book.isbn[0], 'egilea': book.author_name[0], 'data': book.publish_date[0], 'izenburua': book.title, 'filename': }
        return null;
      };
      
    addBookToData = (book, data) => {
        // data array-ean sartu liburua, eta liburu berriaren posizioa bueltatu
        data.push(book);
        return data.length();
    };

    handleSearchData = (data) => {
        // lortu liburua data objektutik
        // extractBookData eta addBookToData funtzioak erabili, indizea berria lortuz
        // updateView funtzioa erabili, liburu berria bistaratzeko
        let liburu = data.docs
        let liburuOndo = this.extractBookData(liburu)
        let indizeBerria= this.addBookToData(liburuOndo, this.data)


    };

    updateView() {
        // liburuaren datu guztiak bistaratu
        // liburu kopurua bistaratu

    }

    nextBook() {
        // Hurrengo indizea lortu eta updateView funtzioa erabili bistaratzeko
        // ez ezazu liburu kopurua gainditu
    }

    prevBook() {
        // Aurreko indizea lortu eta updateView funtzioa erabili bistaratzeko
        // ez ezazu 0 indizea gainditu
    }
}
