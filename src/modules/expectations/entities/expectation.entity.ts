import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { BabyCharacteristics } from '../../../constants/enum';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from 'src/modules/profiles/entities/profiles';

@ObjectType()
@Entity()
export class Expectation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  Expectation_ID: string;

  @Column()
  @Field(() => Int)
  Age: number;

  @Column()
  @Field(() => BabyCharacteristics)
  Characteristics: BabyCharacteristics;

  @Column({type: 'decimal', precision: 10, scale: 2})
  @Field(() => Float)
  Distance: number;

  @Column({type: 'decimal', precision: 10, scale: 2})
  @Field(() => Float)
  Paid: number;

  @Column()
  @Field(() => String)
  Type: string;

  @Column()
  @Field(() => String)
  Description: string;

  @OneToOne(() => Profile, profile => profile.Expectations)
  Profile: Profile;

}

