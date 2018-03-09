class Toilet
{
  //let _color;
  //let _material;
  constructor(color, material)
  {
    this._color = color;
    this._material = material;
  }
  get color(){
    return this._color;
  }
  set color(value)
  {
    if(value === "black" || value === "white"){
      this._color = value;
    }
    else
    {
        alert("Toilets can only be black or white.")
    }
  }
  get material()
  {
    return this._material;
  }

  flush()
  {
    console.log("The toilet flushed.");
  }

}


class PublicToilet extends Toilet
{
  constructor(color, material, tankless)
  {
    super(color,material);
    this._tankless = tankless;
  }

  get tankless()
  {
    return this._tankless;
  }

}
