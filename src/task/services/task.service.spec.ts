import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { Task } from "src/task.data/entities/task.entity"
import { Result } from "src/utilities/result.model"
import { TaskService } from "./task.service"

describe("testing Task service",()=>{
   
    let taskService:TaskService

    beforeEach(async()=>{
        const module = await Test.createTestingModule({
            providers:[
                TaskService,
                {
                    provide:getRepositoryToken(Task),
                    useValue:{}
                }
            ],
            
        }).compile();
        taskService = await module.get<TaskService>(TaskService)
    });


    describe("Testing task service after mock",() => {
        it("testing getTaskById method", async () => {
            const result = [new Promise((resolve,reject)=>{
                resolve(new Result<any>())
            })];
            expect((typeof await taskService.getTask(1))).toEqual(result)
        })

    })
})

