import { ObjectType, Field } from '@nestjs/graphql';
import { Profile } from '../../profiles/entities/profiles';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Education {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  Education_ID: string;

  @Column()
  @Field(() => String)
  Title: string;

  @Column()
  @Field(() => String)
  Certificate_Place: string;

  @Column()
  @Field(() => String)
  Level: string;

  @Column()
  @Field(() => Date)
  Graduation_Time: Date;

  @Column({ default: false })
  @Field(() => Boolean, {defaultValue: false})
  isDeleted: boolean;

  @ManyToOne(() => Profile, profile => profile.Educations)
  @JoinColumn({name: "Profile_ID"})
  @Field(() => Profile)  
  Profile: Profile;
}


@ObjectType()
export class DeleteEducationResponse {
  @Field()
  Message: string;
}