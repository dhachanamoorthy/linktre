import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "users",
})
export class users extends Model<users> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  // @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  uuid: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  username: String;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  mobile: String;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  email: String;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  password: String;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  image_url: String;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  insta_url: String;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  youtube_url: String;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  fb_url: String;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  twitter_url: String;

  @AllowNull(true)
  @Column({
    type: DataType.DATE,
  })
  last_login: Date;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT,
  })
  created_by: bigint;

  @AllowNull(true)
  @Column({
    type: DataType.BIGINT,
  })
  updated_by: bigint;

  @AllowNull(false)
  @Column({
    type: DataType.NOW,
  })
  created_at: Date;

  @AllowNull(true)
  @Column({
    type: DataType.DATE,
  })
  updated_at: Date;

  @AllowNull(true)
  @Column({
    type: DataType.DATE,
  })
  deleted_at: Date;
}
