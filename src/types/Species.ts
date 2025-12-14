import {Types, Model} from 'mongoose';
import {Point} from 'geojson';
import {Category} from './Category';

type Species = {
  species_name: string;
  category: Types.ObjectId | Category;
  location: Point;
  image: string;
};

type SpeciesModel = Model<Species> & {
  findByArea: (polygon: any) => Promise<Species[]>;
};

export {Species, SpeciesModel};
