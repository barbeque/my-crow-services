#[macro_use] extern crate nickel;
extern crate rustc_serialize;
extern crate hyper;

use std::collections::BTreeMap;
use nickel::{Nickel, HttpRouter};
use rustc_serialize::json::{Json, ToJson};

struct CrowFacts {
    noises: Vec<String>
}
impl ToJson for CrowFacts {
    fn to_json(&self) -> Json {
        let mut map = BTreeMap::new();
        map.insert("noises".to_string(), self.noises.to_json());
        Json::Object(map)
    }
}

fn replicate<T : Clone>(item : T, count : u32) -> Vec<T> {
    // FIXME: this probably exists in the standard library
    let mut vec = Vec::new();
    for _ in 0..count {
        vec.push(item.clone());
    }
    return vec;
}

fn main() {
    let mut server = Nickel::new();

    server.get("/caw/:caw_count", middleware! { |request|
        let content = match request.param("caw_count") {
            Some(raw_caw_count) => match raw_caw_count.parse::<u32>() {
                Ok(caw_count)   => {
                    let facts = CrowFacts {
                        noises: replicate("caw".to_string(), caw_count)
                    };
                    facts.to_json()
                }
                Err(_)          => "not a valid number of caws.".to_json() // TODO: throw 500?
            },
            None => "need to provide caw_count parameter.".to_json()
        };
        content.to_string()
    });

    server.listen("127.0.0.1:6767").unwrap();
}
