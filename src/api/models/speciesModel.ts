import mongoose from 'mongoose';
import {Species, SpeciesModel} from '../../types/Species';

const speciesSchema = new mongoose.Schema<Species>({
  species_name: {
    type: String,
    required: true,
    unique: true,
    minLength: 2,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere',
    },
  },
  image: {
    type: String,
    required: true,
  },
});

speciesSchema.statics.findByArea = function (polygon: any) {
  return this.find({
    location: {
      $geoWithin: {
        $geometry: polygon,
      },
    },
  })
    .select('-__v')
    .populate({path: 'category', select: '-__v'});
};

export default mongoose.model<Species, SpeciesModel>('Species', speciesSchema);
