import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { BabyCharacteristics } from '../../../constants/enum';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from 'src/modules/profiles/entities/profiles';

@ObjectType()
@Entity()
export class Expectation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  Expectation_ID: string;

  @Column({nullable: true, default: null})
  @Field(() => Int, {nullable: true})
  Age?: number;

  @Column({nullable: true, default: null})
  @Field(() => BabyCharacteristics)
  Characteristics?: BabyCharacteristics;

  @Column({type: 'decimal', precision: 10, scale: 2,nullable: true, default: null })
  @Field(() => Float)
  Distance?: number;

  @Column({type: 'decimal', precision: 10, scale: 2,nullable: true, default: null})
  @Field(() => Float)
  Paid?: number;

  @Column({nullable: true, default: null})
  @Field(() => String)
  Type?: string;

  @Column({nullable: true, default: null})
  @Field(() => String)
  Description?: string;

  @OneToOne(() => Profile, profile => profile.Expectations)
  @JoinColumn({name: "Profile_ID"})
  Profile: Profile;

}

