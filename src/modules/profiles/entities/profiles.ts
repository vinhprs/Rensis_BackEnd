import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BabyCharacteristics } from '../../../constants/enum';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expectation } from '../../expectations/entities/expectation.entity';
import { ProfileImage } from '../../profile-images/entities/profile-image.entity';

@ObjectType()
@Entity()
export class Profile {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  Profile_ID: string;

  @Field(() => String)
  @Column()
  Profile_Name: string;
  
  @Field(() => String, {nullable: true, defaultValue: null})
  @Column({nullable: true, default: null})
  Nick_Name: string;

  @Field(() => String, {nullable: true, defaultValue: null})
  @Column({nullable: true, default: null})
  Hobby: string;

  @Field(() => String, {nullable: true})
  @Column({nullable: true})
  Education: string;

  @Field(() => Int, {nullable: true, defaultValue: null})
  @Column({nullable: true, default: null})
  Age: number;

  @Field(() => BabyCharacteristics, {nullable: true, defaultValue: null})
  @Column({nullable: true, default: null})
  Characteristics: BabyCharacteristics;

  @Field(() => String, {nullable: true, defaultValue: null})
  @Column({nullable: true, default: null})
  Description: string;

  @OneToOne(() => User, user => user.Profile)
  @Field(() => User)
  @JoinColumn({name: "User_ID"})
  User: User;

  @OneToOne(() => Expectation, expect => expect.Profile, {
    eager: true
  })
  @Field(() => Expectation, {nullable: true, defaultValue: true})
  Expectations?: Expectation;

  @OneToMany(() => ProfileImage, profileImg => profileImg.Profile)
  @Field(() => [ProfileImage], {nullable: true, defaultValue: null})
  Profile_Images?: ProfileImage[];

}
