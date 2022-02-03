import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { trees } from "src/module/tree/models";

@Table({
  tableName: "links",
})
export class links extends Model<links> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @ForeignKey(() => trees)
  @AllowNull(false)
  @Column({
    type: DataType.BIGINT,
  })
  tree_id: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  link_name: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  link_url: string;

  @AllowNull(true)
  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  disabled: boolean;

  @AllowNull(false)
  @Default(DataTypes.NOW)
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
