import Yallist from "yallist"
import { insertNodeBefore } from "../lib/utils/insertNodeBefore";
import {expect} from 'chai';

describe('insertBefore',()=>{
    it('#',()=>{
        let l = Yallist.create([1,2,3,4]);
        insertNodeBefore(1,l,l.tail!);
        expect(l.length).to.equal(5);
        expect(l.toArray()).to.has.members([1,2,3,1,4]);
        insertNodeBefore(2,l,null);
        expect(l.length).to.equal(6);
        expect(l.toArray()).to.has.members([1,2,3,1,4,2]);
        expect(l.tail?.value).to.equal(2);
        insertNodeBefore(3,l,l.head);
        expect(l.length).to.equal(7);
        expect(l.toArray()).to.has.members([3,1,2,3,1,4,2]);
        expect(l.head?.value).to.equal(3);
    });
});