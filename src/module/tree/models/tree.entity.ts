import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
  } from 'sequelize-typescript';
  import {users} from '../../user/models/users.entity'
  @Table({
    tableName: 'tree',
  })
  export class tree extends Model<tree> {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column({
      type: DataType.BIGINT,
    })
    id: number;
  
    @ForeignKey(()=>users)
    @AllowNull(false)
    @Column({
      type:DataType.BIGINT
    })
    user_id : number;
  
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
  