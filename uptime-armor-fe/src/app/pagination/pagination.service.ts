import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  currentPage = 1;
  itemsPerPage = 5;
  searchTerm = '';
  key='';
  depth =1;

  advSearch = false;
  
  _items : any[] = [];
  _filteredItems : any [] = [];

  
  set items ( items : any []) {
      this._items = items;
      this.filterItems();
   }

  get totalPages(): number[] {
    return Array(Math.ceil(this._filteredItems.length / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
  }

  get showingFrom(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get showingTo(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this._filteredItems.length);
  }

  get paginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this._filteredItems.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalEntries(): number {
    return this._filteredItems.length;
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  onItemsPerPageChange() {
    this.currentPage = 1; 
 }
  
 toggleAdvSearch(){
  this.key = '';
  this.searchTerm = '';
  this.filterItems();
  this.advSearch = !this.advSearch;
  }
  
 filterItems(): void {
  if (!this.searchTerm) {
    this._filteredItems = [...this._items];
    return;
  }
  if(!this.advSearch || (this.advSearch && !this.key)){
    this._filteredItems = this._items.filter(item  => Object.values(item).some(value => {
      if (typeof value === 'string' && value.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        console.log("if not advance search or emptyKey: searchTerm",this.searchTerm, "item", item);
        return true; 
      }
      return false;
    })
      );
  }
  else{
  
  this._filteredItems = this._items.filter(item => {
    this.depth =1;
    const sts = this.searchInProperties(item, this.searchTerm.toLowerCase(), this.key);
    console.log("else:item ", item,"sts: ", sts);
    return sts;
   
  });
}
}


private searchInProperties(item: any, searchTerm: string, searchKey: string): boolean {
  const parentKeyLower = searchKey.toLowerCase();
  const entries = Object.entries(item);
  for (const [key, value] of entries) {
    const currentKeyLower = key.toLowerCase();
    const searchKeyLower = searchKey.toLowerCase();
    if (currentKeyLower === searchKeyLower && typeof value === 'object' && value !== null) {
      this.depth = this.depth +1 ;
      if (this.searchInProperties(value, searchTerm, searchKeyLower)) {
        return true; 
      }
    } 
    else if (currentKeyLower === searchKeyLower || (parentKeyLower === searchKeyLower && this.depth > 1) ) {
      if (value instanceof Date) {
        const dateAsString = value.toISOString();
        if (dateAsString.toLowerCase().includes(searchTerm.toLowerCase())) {
          return true;
        }
      }
      if (typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
    }
  }

  const searchKeyLower = searchKey.toLowerCase();  
  if (item.hasOwnProperty(searchKeyLower) && typeof item[searchKeyLower] === 'string' && item[searchKeyLower].toLowerCase().includes(searchTerm.toLowerCase())) {
    return true;
  }
  return false;
}



}
