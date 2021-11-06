import { Component, OnInit } from '@angular/core';
import { Horse } from 'src/app/models/horse';
import { HorseService } from 'src/app/services/horse.service';

@Component({
  selector: 'app-horse',
  templateUrl: './horse.component.html',
  styleUrls: ['./horse.component.css']
})
export class HorseComponent implements OnInit {

  private horseService : HorseService;

  public horses : Horse[] = [];

  public id: number;
  public name : string;
  public runs : number;
  public wins : number;
  public about : string;  
  public editMode : boolean = false;

  constructor(horseService : HorseService) {
    this.horseService = horseService;
  }

  ngOnInit(): void {
    this.horseService.getAllHorse().subscribe((horseFromApi) =>{
      this.horses = horseFromApi;
      this.horses.sort((a, b) => a.name.localeCompare(b.name));
  })
}
public addHorse(){
  var newHorse : Horse = {
    id : this.id,
    name : this.name,
    runs : this.runs,
    wins : this.wins,
    about : this.about
  }
  this.horseService.addHorse(newHorse).subscribe((horse_Id) =>{
    newHorse.id = horse_Id;
    this.horses.push(newHorse);
    this.clearForm();
  })
}
public clearForm(){
  this.name ="";
  this.runs = 0;
  this.wins = 0;
  this.about = "";
}
public updateHorse(horse: Horse): void {
  this.editMode = true;

  this.id = horse.id;
  this.name = horse.name;
  this.runs = horse.runs;
  this.wins = horse.wins;
  this.about = horse.about;    
}
public sendUpdatedHorse (){
  var updatedHorse: Horse = {
    id: this.id,
    name : this.name,
    runs : this.runs,
    wins : this.wins,
    about : this.about
  }
  this.horseService.updateHorse(updatedHorse).subscribe(() =>{
    for (let i = 0; i < this.horses.length; i++) {
      const hor = this.horses[i];
      if (hor.id == updatedHorse.id) {
        hor.name = updatedHorse.name;
        hor.runs = updatedHorse.runs;          
        hor.wins = updatedHorse.wins;
        hor.about = updatedHorse.about;
        return;          
      }      
    }    
  })
  this.editMode = false;
  this.clearForm();
}
public deleteHorse(id: number) : void {
  this.horseService.deleteHorse(id).subscribe(() =>{   
  this.horses = this.horses.filter(h => h.id !== id);
  })
}
}