import { Component, OnInit } from '@angular/core';
import { Better } from 'src/app/models/better';
import { Horse } from 'src/app/models/horse';
import { BetterService } from 'src/app/services/better.service';
import { HorseService } from 'src/app/services/horse.service';

@Component({
  selector: 'app-better',
  templateUrl: './better.component.html',
  styleUrls: ['./better.component.css'],
})
export class BetterComponent implements OnInit {
  private betterService: BetterService;
  private horseService: HorseService;

  public betters: Better[] = [];
  public horses: Horse[] = [];

  public id: number;
  public name: string;
  public surname: string;
  public bet: number;
  public horseId: number;
  public horseName: string;

  public editMode: boolean = false;
  public filteredByHorse: number;

  constructor(betterService: BetterService, horseService: HorseService) {
    this.betterService = betterService;
    this.horseService = horseService;
  }

  ngOnInit(): void {
    this.betterService.getAllBetters().subscribe((betterFromApi) => {
      this.betters = betterFromApi;
      this.betters.sort((a, b) => b.bet - a.bet);
    });
    this.horseService.getAllHorses().subscribe((horseFromApi) => {
      this.horses = horseFromApi;
      this.horses.sort((a, b) => a.name.localeCompare(b.name));
      for (let i = 0; i < this.betters.length; i++) {
        const bh = this.betters[i];
        const selectedHorse = this.horses.filter((h) => h.id == bh.horseId)[0];

        bh.horseName = selectedHorse.name;
      }
    });
  }
  public addBetter(){
    var newBetter : Better = {
      id : this.id,
      name : this.name,
      surname : this.surname,
      bet : this.bet,
      horseId : this.horseId
    }
    this.betterService.addBetter(newBetter).subscribe((betterId) =>{
      newBetter.id = betterId;
      this.betters.push(newBetter);
      this.clearForm();    
    })
  }
  public clearForm(){
    this.name ="";
    this.surname = "";
    this.bet = 0;
    this.horseId = null;
  }
  public updateBetter(better: Better): void {
    this.editMode = true;
  
    this.id = better.id;
    this.name = better.name;
    this.surname = better.surname;
    this.bet = better.bet;
    this.horseId = better.horseId;
  }
  
  public sendUpdatedBetter(){
    var updatedBetter: Better = {
      id: this.id,
      name : this.name,
      surname : this.surname,
      bet : this.bet,
      horseId : this.horseId,
    }
    this.betterService.updateBetter(updatedBetter).subscribe(() =>{
      (this.betters = this.betters.map((b) =>
      b.id !== updatedBetter.id ? b : updatedBetter
      )
      )   
      .sort((a, b) => b.bet - a.bet)
    })
    this.editMode = false; 
    this.clearForm(); 
  }
  public deleteBetter(id: number) : void {
    this.betterService.deleteBetter(id).subscribe(() =>{   
    this.betters = this.betters.filter(h => h.id !== id);
    })
  }

  public getAllBettersByHorse(id : number):void{
    this.betterService.getAllBetters().subscribe((betterFromApi) => {
      this.betters = betterFromApi;
      
      if (id == 0) {
        this.ngOnInit();
      }
      this.betters = this.betters.filter(b => b.horseId == id);
      
      this.horseService.getAllHorses().subscribe((horseFromApi) => {
        this.horses = horseFromApi;
        this.horses.sort((a, b) => a.name.localeCompare(b.name));
        for (let i = 0; i < this.betters.length; i++) {
          const bh = this.betters[i];
          const selectedHorse = this.horses.filter((h) => h.id == bh.horseId)[0];
  
          bh.horseName = selectedHorse.name;
        }
      });
      
  })
}
}
