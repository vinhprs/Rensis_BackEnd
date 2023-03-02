import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Profile } from '../../profiles/entities/profiles';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ProfileImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  Profile_Images_ID: string

  @Column()
  @Field(() => String)
  Image_Url: string;

  @Column()
  @Field(() => Boolean)
  isAvatar: boolean;

  @ManyToOne(() => Profile, profile => profile.Profile_Images)
  @JoinColumn({name: "Profile_ID"})
  @Field(() => Profile)
  Profile: Profile;

}
